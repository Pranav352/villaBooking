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

    def __str__(self):
        return self.name

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
