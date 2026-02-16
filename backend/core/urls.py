from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BannerViewSet
from .views import MembershipCategoryViewSet
from .views import AssignMembershipViewSet
from .views import NewsRoomViewSet
from .views import GalleryViewSet

router = DefaultRouter()
router.register(r"banners", BannerViewSet, basename="banner")
router.register(r"membership-categories", MembershipCategoryViewSet, basename="membershipcategory")
router.register(r"assign-memberships", AssignMembershipViewSet, basename="assignmembership")
router.register(r"news-room", NewsRoomViewSet, basename="newsroom")
router.register(r"gallery", GalleryViewSet, basename="gallery")
urlpatterns = [
    path("", include(router.urls)),
    path("membership-categories/", MembershipCategoryViewSet.as_view({"get": "list"}), name="membership-category-list"),
    path("assign-memberships/", AssignMembershipViewSet.as_view({"get": "list"}), name="assign-membership-list"),
    path("news-room/", NewsRoomViewSet.as_view({"get": "list"}), name="news-room-list"),
    path("gallery/", GalleryViewSet.as_view({"get": "list"}), name="gallery-list"),
]
