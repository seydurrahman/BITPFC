from rest_framework.permissions import BasePermission


class IsAdminOrRoleAdmin(BasePermission):
    """Allow access only to staff/superuser or users with role 'admin'."""

    def has_permission(self, request, view):
        user = getattr(request, "user", None)
        if not user or not user.is_authenticated:
            return False
        if user.is_staff or user.is_superuser:
            return True
        return getattr(user, "role", None) == "admin"
