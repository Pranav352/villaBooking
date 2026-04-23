"""
Views for the Villa Booking API.
Includes logic for:
- Villa filtering (location, guests, price)
- Villa availability checks
- User registration (User + UserProfile)
"""
from rest_framework import viewsets, permissions, status

from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Q
from .models import Villa, UserProfile, Booking, ContactMessage
from .serializers import VillaSerializer, UserProfileSerializer, BookingSerializer, RegisterSerializer, ContactMessageSerializer


class VillaViewSet(viewsets.ModelViewSet):
    queryset = Villa.objects.all()
    serializer_class = VillaSerializer
    filterset_fields = ['location', 'max_guests']
    search_fields = ['name', 'location', 'description']
    ordering_fields = ['price_per_night', 'rating']
    ordering = ['id']  # Default ordering for pagination consistency
    
    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAdminUser()]
        return [permissions.AllowAny()]

    @action(detail=True, methods=['get'])
    def check_availability(self, request, pk=None):
        villa = self.get_object()
        check_in = request.query_params.get('check_in')
        check_out = request.query_params.get('check_out')

        if not check_in or not check_out:
            return Response({"error": "Please provide check_in and check_out dates."}, status=status.HTTP_400_BAD_REQUEST)

        overlapping_bookings = Booking.objects.filter(
            villa=villa,
            status='confirmed'
        ).filter(
            Q(check_in__lt=check_out) & Q(check_out__gt=check_in)
        )

        is_available = not overlapping_bookings.exists()
        return Response({"available": is_available})


class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    filterset_fields = ['email']
    search_fields = ['name', 'email']
    ordering = ['id']

class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    filterset_fields = ['status', 'user_email', 'villa']
    ordering_fields = ['check_in', 'created_at']
    ordering = ['-created_at']

    def get_permissions(self):
        # Allow anybody to create a booking or view details
        if self.action in ['create', 'list', 'retrieve']:
            return [permissions.AllowAny()]
        # Full updates (PUT), partial updates (PATCH), and deletions (DELETE) 
        # must be restricted to Admin users for security and consistency.
        return [permissions.IsAdminUser()]
class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ContactMessageView(APIView):
    """
    POST  /api/contact/  — Save a new contact message from the form.
    GET   /api/contact/  — List all messages (admin only).
    """
    def get_permissions(self):
        if self.request.method == 'GET':
            return [permissions.IsAdminUser()]
        return [permissions.AllowAny()]

    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Your message has been received. We'll get back to you shortly!"},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        messages = ContactMessage.objects.all().order_by('-created_at')
        serializer = ContactMessageSerializer(messages, many=True)
        return Response(serializer.data)

    def delete(self, request, pk=None):
        try:
            message = ContactMessage.objects.get(pk=pk)
            message.delete()
            return Response({"message": "Contact message deleted."}, status=status.HTTP_204_NO_CONTENT)
        except ContactMessage.DoesNotExist:
            return Response({"error": "Message not found."}, status=status.HTTP_404_NOT_FOUND)
