from django.urls import include, path
from rest_framework.routers import SimpleRouter

from api.views import BookViewSet, VisitorViewSet

router = SimpleRouter()

router.register("books", BookViewSet, basename="Books")

router.register("visitors", VisitorViewSet, basename="Visitors")


urlpatterns = [
    path("auth/", include("djoser.urls.authtoken")),
    path("", include(router.urls)),
]
