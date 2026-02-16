from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.pagination import PageNumberPagination
from .models import (
    AssignMembership,
    Banner,
    Gallery,
    MembershipCategory,
    NewsRoom,
    StudyCenter,
    Events,
    VideoMedia,
    Album,
)
from .serializers import (
    AssignMembershipSerializer,
    BannerSerializer,
    GallerySerializer,
    MembershipCategorySerializer,
    NewsRoomSerializer,
    StudyCenterSerializer,
    EventSerializer,
    VideoMediaSerializer,
    AlbumSerializer,
)
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


class AssignMembershipViewSet(viewsets.ModelViewSet):
    queryset = AssignMembership.objects.all().order_by("-assigned_at")
    serializer_class = AssignMembershipSerializer
    permission_classes = (IsAdminOrReadOnly,)


class NewsRoomViewSet(viewsets.ModelViewSet):
    queryset = NewsRoom.objects.all().order_by("-id")
    serializer_class = NewsRoomSerializer
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = (IsAdminOrReadOnly,)
    pagination_class = BannerPagination


class GalleryViewSet(viewsets.ModelViewSet):
    queryset = Gallery.objects.all().order_by("-id")
    serializer_class = GallerySerializer
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = (IsAdminOrReadOnly,)
    pagination_class = BannerPagination


class VideoMediaViewSet(viewsets.ModelViewSet):
    queryset = VideoMedia.objects.all().order_by("-id")
    serializer_class = VideoMediaSerializer
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = (IsAdminOrReadOnly,)
    pagination_class = BannerPagination


class AlbumViewSet(viewsets.ModelViewSet):
    queryset = Album.objects.all().order_by("-id")
    serializer_class = AlbumSerializer
    permission_classes = (IsAdminOrReadOnly,)


class StudyCenterViewSet(viewsets.ModelViewSet):
    queryset = StudyCenter.objects.all().order_by("-id")
    serializer_class = StudyCenterSerializer
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = (IsAdminOrReadOnly,)
    pagination_class = BannerPagination


class EventViewSet(viewsets.ModelViewSet):
    queryset = Events.objects.all().order_by("-id")
    serializer_class = EventSerializer
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = (IsAdminOrReadOnly,)
    pagination_class = BannerPagination
