from django.db import models
from django.contrib.auth.models import User

# Create your models here.
from django.db import models
from django.contrib.auth.models import User

class Provider(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    gpu_name = models.CharField(max_length=100)
    vram_gb = models.FloatField()
    price_per_min = models.FloatField(default=0.05)
    is_online = models.BooleanField(default=False)
    total_earnings = models.FloatField(default=0.0)
    rating = models.FloatField(default=0.0)

    def __str__(self):
        return f"{self.user.username} ({self.gpu_name})"

class Job(models.Model):
    TASK_TYPES = [
        ("ESRGAN", "Image Upscaling"),
        ("SD_TURBO", "Text-to-Image"),
    ]
    STATUS_CHOICES = [
        ("QUEUED", "Queued"),
        ("ASSIGNED", "Assigned"),
        ("RUNNING", "Running"),
        ("SUCCEEDED", "Succeeded"),
        ("FAILED", "Failed"),
    ]

    customer = models.ForeignKey(User, on_delete=models.CASCADE, related_name="jobs")
    provider = models.ForeignKey(Provider, on_delete=models.SET_NULL, null=True, blank=True)
    task_type = models.CharField(max_length=20, choices=TASK_TYPES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="QUEUED")
    input_uri = models.CharField(max_length=500)
    output_uri = models.CharField(max_length=500, blank=True, null=True)
    cost_cents = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    started_at = models.DateTimeField(null=True, blank=True)
    finished_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.task_type} - {self.status} ({self.id})"