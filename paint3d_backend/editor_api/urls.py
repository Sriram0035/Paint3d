# editor_api/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'projects', views.ProjectViewSet)
router.register(r'pages', views.CanvasPageViewSet)
router.register(r'assets', views.ImageAssetViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

# paint3d_backend/urls.py
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('editor_api.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)