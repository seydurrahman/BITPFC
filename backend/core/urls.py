from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BannerViewSet
from .views import MembershipCategoryViewSet

router = DefaultRouter()
router.register(r"banners", BannerViewSet, basename="banner")
router.register(r"membership-categories", MembershipCategoryViewSet, basename="membershipcategory")
urlpatterns = [
    path("", include(router.urls)),
    path("membership-categories/", MembershipCategoryViewSet.as_view({"get": "list"}), name="membership-category-list"),
]
