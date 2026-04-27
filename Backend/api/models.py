from django.db import models

class Villa(models.Model):
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    price_per_night = models.DecimalField(max_digits=10, decimal_places=2)
    rating = models.FloatField(default=4.0)
    max_guests = models.IntegerField()
    description = models.TextField()
    images = models.JSONField(default=list)
    amenities = models.JSONField(default=list)
    unavailable_dates = models.JSONField(default=list)

    def update_rating(self):
        reviews = self.reviews.all()
        if reviews.exists():
            avg = sum([r.rating for r in reviews]) / reviews.count()
            self.rating = round(avg, 1)
            self.save()

    def __str__(self):
        return self.name

class Review(models.Model):
    villa = models.ForeignKey(Villa, on_delete=models.CASCADE, related_name='reviews')
    user_name = models.CharField(max_length=255)
    user_email = models.EmailField()
    rating = models.IntegerField() # 1 to 5
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.villa.update_rating()

    def __str__(self):
        return f"{self.user_name} - {self.villa.name} ({self.rating} stars)"

class UserProfile(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Booking(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
    ]
    villa = models.ForeignKey(Villa, on_delete=models.CASCADE, related_name='bookings')
    user_email = models.EmailField()
    name = models.CharField(max_length=255)
    check_in = models.DateField()
    check_out = models.DateField()
    guests = models.IntegerField()
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.villa.name} ({self.check_in})"

class ContactMessage(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} <{self.email}> - {self.created_at.strftime('%Y-%m-%d %H:%M')}"

class Wishlist(models.Model):
    user_profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='wishlist')
    villa = models.ForeignKey(Villa, on_delete=models.CASCADE, related_name='wishlisted_by')
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user_profile', 'villa')

    def __str__(self):
        return f"{self.user_profile.email} saved {self.villa.name}"
