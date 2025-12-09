# editor_api/serializers.py

from rest_framework import serializers
from .models import Project, CanvasPage, ImageAsset

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'
        read_only_fields = ['user', 'created_at', 'updated_at']

class CanvasPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CanvasPage
        fields = '__all__'
        read_only_fields = ['created_at']

class ImageAssetSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageAsset
        fields = '__all__'
        read_only_fields = ['user', 'uploaded_at']