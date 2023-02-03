from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsLibrarianAndAbove(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return bool(
            request.user.is_librarian or
            request.user.is_admin
            )
        