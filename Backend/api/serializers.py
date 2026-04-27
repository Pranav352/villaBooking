"""
Serializers for the Villa Booking API.
Includes:
- Booking validation (prevents overlapping dates)
- User registration (creates both User and UserProfile)
"""
from rest_framework import serializers

from django.contrib.auth.models import User
from .models import Villa, UserProfile, Booking, ContactMessage, Review, Wishlist
from django.db.models import Q


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class VillaSerializer(serializers.ModelSerializer):
    reviews = ReviewSerializer(many=True, read_only=True)
    
    class Meta:
        model = Villa
        fields = '__all__'

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'

class BookingSerializer(serializers.ModelSerializer):
    villa_name = serializers.ReadOnlyField(source='villa.name')
    villa_image = serializers.SerializerMethodField()

    class Meta:
        model = Booking
        fields = '__all__'

    def get_villa_image(self, obj):
        # Return the first image of the villa if it exists
        if obj.villa and hasattr(obj.villa, 'images') and obj.villa.images and len(obj.villa.images) > 0:
            return obj.villa.images[0]
        return None

    def validate(self, data):
        # Support partial updates (PATCH) by falling back to existing instance values
        instance = self.instance
        villa = data.get('villa', getattr(instance, 'villa', None))
        check_in = data.get('check_in', getattr(instance, 'check_in', None))
        check_out = data.get('check_out', getattr(instance, 'check_out', None))
        status = data.get('status', getattr(instance, 'status', 'pending'))

        if check_in and check_out and check_in >= check_out:
            raise serializers.ValidationError("Check-out date must be after check-in date.")

        # Always check if the villa is already 'confirmed' for these dates by another user
        if villa and status != 'cancelled':
            overlapping_bookings = Booking.objects.filter(
                villa=villa,
                status='confirmed'
            ).filter(
                Q(check_in__lt=check_out) & Q(check_out__gt=check_in)
            )

            if instance:
                overlapping_bookings = overlapping_bookings.exclude(pk=instance.pk)

            if overlapping_bookings.exists():
                raise serializers.ValidationError("This villa is already booked for the selected dates.")

        return data

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    email = serializers.EmailField(required=True)
    name = serializers.CharField(required=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'email', 'name']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('name', '')
        )
        UserProfile.objects.create(
            name=validated_data.get('name', ''),
            email=validated_data['email']
        )
        return user

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'message', 'created_at']
        read_only_fields = ['id', 'created_at']

class WishlistSerializer(serializers.ModelSerializer):
    villa_details = VillaSerializer(source='villa', read_only=True)
    
    class Meta:
        model = Wishlist
        fields = ['id', 'user_profile', 'villa', 'villa_details', 'added_at']
        read_only_fields = ['id', 'added_at']
