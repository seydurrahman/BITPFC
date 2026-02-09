from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BannerViewSet
from .views import MembershipCategoryViewSet
from .views import AssignMembershipViewSet

router = DefaultRouter()
router.register(r"banners", BannerViewSet, basename="banner")
router.register(r"membership-categories", MembershipCategoryViewSet, basename="membershipcategory")
router.register(r"assign-memberships", AssignMembershipViewSet, basename="assignmembership")
urlpatterns = [
    path("", include(router.urls)),
    path("membership-categories/", MembershipCategoryViewSet.as_view({"get": "list"}), name="membership-category-list"),
    path("assign-memberships/", AssignMembershipViewSet.as_view({"get": "list"}), name="assign-membership-list"),
]
