# api/v2/views.py
"""
V2 Views — extend V1 views with enhancements.
Only override what changes in V2; everything else is inherited from V1.

Example V2 enhancement added:
- VillaViewSet: returns a 'version' field in list responses to demonstrate V2 differences.
  Replace this example with your real V2 business logic when ready.
"""
from rest_framework.response import Response
from api.v1.views import (
    VillaViewSet as VillaViewSetV1,
    UserProfileViewSet,
    BookingViewSet,
    RegisterView,
    ContactMessageView,
    ReviewViewSet,
    WishlistViewSet,
)

# Re-export unchanged views so v2/urls.py only imports from here
__all__ = [
    'VillaViewSet', 'UserProfileViewSet', 'BookingViewSet',
    'RegisterView', 'ContactMessageView', 'ReviewViewSet', 'WishlistViewSet',
]


class VillaViewSet(VillaViewSetV1):
    """
    V2 enhancement: list response includes API version metadata.
    Swap out this override for your real V2 logic (e.g. new filters,
    different serializer, extra fields).
    """
    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        # Inject version info — replace with real V2 logic
        if isinstance(response.data, dict):
            response.data['api_version'] = 'v2'
        return response