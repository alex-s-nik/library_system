from django.urls import include, path
from rest_framework.routers import SimpleRouter

from api.views import VisitorViewSet

router = SimpleRouter()

router.register(
    'visitors',
    VisitorViewSet,
    basename = 'Visitors'
)


urlpatterns = [
    path('auth/', include('djoser.urls.authtoken')),
    path('', include(router.urls)),
]
