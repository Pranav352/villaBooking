"""
URL configuration for the Villa API.
Includes core viewsets and dedicated registration/auth endpoints.
"""
from django.urls import path, include

from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from .views import VillaViewSet, UserProfileViewSet, BookingViewSet, RegisterView, ContactMessageView, ReviewViewSet, WishlistViewSet

router = DefaultRouter()
router.register(r'villas', VillaViewSet)
router.register(r'user-profiles', UserProfileViewSet)
router.register(r'bookings', BookingViewSet)
router.register(r'reviews', ReviewViewSet)
router.register(r'wishlist', WishlistViewSet, basename='wishlist')

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='register'),
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),
    path('contact/', ContactMessageView.as_view(), name='contact'),
    path('contact/<int:pk>/', ContactMessageView.as_view(), name='contact-detail'),
]

