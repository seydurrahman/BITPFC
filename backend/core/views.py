from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.pagination import PageNumberPagination
from .models import Banner, MembershipCategory
from .serializers import BannerSerializer, MembershipCategorySerializer
from .permissions import IsAdminOrReadOnly


class BannerPagination(PageNumberPagination):
    page_size = 10


class BannerViewSet(viewsets.ModelViewSet):
    queryset = Banner.objects.all().order_by("-id")
    serializer_class = BannerSerializer
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = (IsAdminOrReadOnly,)
    pagination_class = BannerPagination

class MembershipCategoryViewSet(viewsets.ModelViewSet):
    queryset = MembershipCategory.objects.all().order_by("-id")
    serializer_class = MembershipCategorySerializer
    permission_classes = (IsAdminOrReadOnly,)
    