from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.pagination import PageNumberPagination
from .models import Banner
from .serializers import BannerSerializer
from .permissions import IsAdminOrRoleAdmin


class BannerPagination(PageNumberPagination):
    page_size = 10


class BannerViewSet(viewsets.ModelViewSet):
    queryset = Banner.objects.all().order_by("-id")
    serializer_class = BannerSerializer
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = (IsAdminOrRoleAdmin,)
    pagination_class = BannerPagination
