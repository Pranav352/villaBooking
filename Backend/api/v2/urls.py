# api/v2/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token

from .views import (
    VillaViewSet, UserProfileViewSet, BookingViewSet,
    RegisterView, ContactMessageView, ReviewViewSet, WishlistViewSet
)

router = DefaultRouter()
router.register(r'villas', VillaViewSet)
router.register(r'user-profiles', UserProfileViewSet)
router.register(r'bookings', BookingViewSet)
router.register(r'reviews', ReviewViewSet)
router.register(r'wishlist', WishlistViewSet, basename='wishlist')

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='v2-register'),
    path('api-token-auth/', obtain_auth_token, name='v2-api-token-auth'),
    path('contact/', ContactMessageView.as_view(), name='v2-contact'),
    path('contact/<int:pk>/', ContactMessageView.as_view(), name='v2-contact-detail'),
]