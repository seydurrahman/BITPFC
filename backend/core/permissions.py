from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsAdminOrReadOnly(BasePermission):
    """Allow read-only access for any request, but write access only to admins.

    Read (SAFE) methods: GET, HEAD, OPTIONS are allowed for unauthenticated users.
    Unsafe methods require the user to be staff/superuser or have role 'admin'.
    """

    def has_permission(self, request, view):
        # allow safe methods for everyone
        if request.method in SAFE_METHODS:
            return True

        user = getattr(request, "user", None)
        if not user or not user.is_authenticated:
            return False
        if user.is_staff or user.is_superuser:
            return True
        return getattr(user, "role", None) == "admin"
