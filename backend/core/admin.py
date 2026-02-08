from django.contrib import admin
from .models import Banner, MembershipCategory

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