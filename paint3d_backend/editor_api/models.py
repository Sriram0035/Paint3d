# editor_api/models.py

from django.db import models
from django.contrib.auth.models import User

class Project(models.Model):
    name = models.CharField(max_length=255)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']

class CanvasPage(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='pages')
    page_number = models.IntegerField()
    title = models.CharField(max_length=255, default='Untitled')
    
    # Store 2D canvas data as JSON
    canvas_data = models.JSONField(default=dict)
    
    # Store 3D scene data
    scene_data = models.JSONField(default=dict)
    
    # Thumbnail
    thumbnail = models.ImageField(upload_to='thumbnails/', null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)

class ImageAsset(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='assets/')
    name = models.CharField(max_length=255)
    uploaded_at = models.DateTimeField(auto_now_add=True)