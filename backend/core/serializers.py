from rest_framework import serializers
from .models import AssignMembership, Banner, MembershipCategory


class BannerSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    thumbnail_url = serializers.SerializerMethodField()

    class Meta:
        model = Banner
        fields = (
            "id",
            "title",
            "description",
            "image",
            "image_url",
            "thumbnail_url",
            "is_active",
        )
        read_only_fields = ("id", "image_url", "thumbnail_url")

    def get_image_url(self, obj):
        request = self.context.get("request")
        if obj.image and hasattr(obj.image, "url"):
            return (
                request.build_absolute_uri(obj.image.url) if request else obj.image.url
            )
        return None

    def get_thumbnail_url(self, obj):
        request = self.context.get("request")
        if obj.thumbnail and hasattr(obj.thumbnail, "url"):
            return (
                request.build_absolute_uri(obj.thumbnail.url)
                if request
                else obj.thumbnail.url
            )
        # fall back to image url
        return self.get_image_url(obj)

    def validate(self, data):
        # Validate title
        title = data.get("title") or (self.instance.title if self.instance else None)
        if not title or len(title.strip()) < 3:
            raise serializers.ValidationError(
                {"title": "Title must be at least 3 characters."}
            )

        # Validate image size and type if provided
        image = data.get("image")
        if image:
            # size limit 5MB
            max_size = 5 * 1024 * 1024
            if hasattr(image, "size") and image.size > max_size:
                raise serializers.ValidationError(
                    {"image": "Image size must be <= 5MB."}
                )
            # basic content type check
            content_type = getattr(image, "content_type", "")
            if content_type and not content_type.startswith("image/"):
                raise serializers.ValidationError(
                    {"image": "Uploaded file must be an image."}
                )

        return data


class MembershipCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = MembershipCategory
        fields = (
            "id",
            "name",
            "experiences",
            "price",
            "year_type",
            "vote",
            "is_active",
        )
        read_only_fields = ("id",)

    def validate_name(self, value):
        if not value or len(value.strip()) < 3:
            raise serializers.ValidationError("Name must be at least 3 characters.")
        return value

class AssignMembershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssignMembership
        fields = (
            "id",
            "user",
            "membership_category",
            "member_id",
            "committee_type",
            "designation",
            "assigned_at",
        )
        read_only_fields = ("id", "assigned_at")