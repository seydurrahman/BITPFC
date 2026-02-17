from django.contrib import admin
from .models import (
    AssignMembership,
    Banner,
    Gallery,
    MembershipCategory,
    NewsRoom,
    VideoMedia,
    StudyCenter,
    Events,
)


@admin.register(Banner)
class BannerAdmin(admin.ModelAdmin):
    list_display = ("title", "is_active")
    list_filter = ("is_active",)
    search_fields = ("title",)


# Register your models here.
@admin.register(MembershipCategory)
class MembershipCategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "price", "year_type", "is_active")
    list_filter = ("is_active",)
    search_fields = ("name",)


@admin.register(AssignMembership)
class AssignMembershipAdmin(admin.ModelAdmin):
    list_display = ("user", "membership_category", "assigned_at")
    list_filter = ("assigned_at",)
    search_fields = ("user__username", "membership_category__name")


@admin.register(NewsRoom)
class NewsRoomAdmin(admin.ModelAdmin):
    list_display = ("title", "is_active", "created_at", "updated_at")
    list_filter = ("is_active", "created_at")
    search_fields = ("title",)
    fields = (
        "title",
        "description",
        "image",
        "thumbnail",
        "news_link",
        "is_active",
        "created_at",
        "updated_at",
    )


@admin.register(Gallery)
class GalleryAdmin(admin.ModelAdmin):
    list_display = ("title", "created_at", "updated_at")
    list_filter = ("created_at",)
    search_fields = ("title",)
    fields = (
        "title",
        "description",
        "image",
        "created_at",
        "updated_at",
    )


@admin.register(VideoMedia)
class VideoMediaAdmin(admin.ModelAdmin):
    list_display = ("title", "created_at", "updated_at")
    list_filter = ("created_at",)
    search_fields = ("title",)
    fields = (
        "title",
        "description",
        "video_url",
        "thumbnail",
        "album",
        "created_at",
        "updated_at",
    )


@admin.register(StudyCenter)
class StudyCenterAdmin(admin.ModelAdmin):
    list_display = ("title", "type", "created_at", "updated_at")
    list_filter = ("type", "created_at")
    search_fields = ("title",)
    fields = (
        "title",
        "type",
        "description",
        "image",
        "created_at",
        "updated_at",
    )


@admin.register(Events)
class EventsAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "type",
        "organizer",
        "event_date",
        "is_active",
        "created_at",
        "updated_at",
    )
    list_filter = ("type", "is_active", "event_date", "created_at")
    search_fields = ("title", "organizer")
    fields = (
        "title",
        "description",
        "type",
        "organizer",
        "image",
        "thumbnail",
        "event_date",
        "is_active",
        "created_at",
        "updated_at",
    )
