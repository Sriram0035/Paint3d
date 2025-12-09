# editor_api/views.py

from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Project, CanvasPage, ImageAsset
from .serializers import ProjectSerializer, CanvasPageSerializer, ImageAssetSerializer

class ProjectViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Project.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class CanvasPageViewSet(viewsets.ModelViewSet):
    serializer_class = CanvasPageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        project_id = self.request.query_params.get('project_id')
        return CanvasPage.objects.filter(project_id=project_id)

class ImageAssetViewSet(viewsets.ModelViewSet):
    serializer_class = ImageAssetSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return ImageAsset.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)