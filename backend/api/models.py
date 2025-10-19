from django.db import models
from django.contrib.auth.models import User
import uuid

# Create your models here.
class Provider(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, null=True, blank=True)
    gpu_name = models.CharField(max_length=255)
    vram_gb = models.FloatField()
    base_clock_ghz = models.FloatField(default=0)
    boost_clock_ghz = models.FloatField(default=0)
    cuda_cores = models.IntegerField(default=0)

    is_online = models.BooleanField(default=False)
    current_job = models.ForeignKey('Job', on_delete=models.SET_NULL, null=True, blank=True, related_name='active_provider')

    # Dashboard stats
    total_earned = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    jobs_completed = models.IntegerField(default=0)
    uptime_percent = models.FloatField(default=0)
    rating = models.FloatField(default=0)

    # Live telemetry
    gpu_usage = models.FloatField(default=0)         # %
    temperature_c = models.FloatField(default=0)     # °C

    def __str__(self):
        return f"{self.user.username} ({self.gpu_name})"

class Job(models.Model):
    customer = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='customer_jobs')
    provider = models.ForeignKey(Provider, on_delete=models.SET_NULL, null=True, related_name='provider_jobs')

    job_code = models.CharField(max_length=10, unique=True)  # e.g., "J-8067"
    task_type = models.CharField(max_length=50, choices=[
        ('ML_TRAINING', 'ML Training'),
        ('IMAGE_UPSCALE', 'Image Upscaling'),
        ('AI_RENDER', 'AI Rendering'),
    ])
    status = models.CharField(max_length=20, choices=[
        ('QUEUED', 'Queued'),
        ('RUNNING', 'Running'),
        ('SUCCEEDED', 'Succeeded'),
        ('FAILED', 'Failed'),
    ], default='QUEUED')

    input_uri = models.TextField()
    output_uri = models.TextField(null=True, blank=True)

    progress_percent = models.FloatField(default=0)
    time_elapsed = models.DurationField(null=True, blank=True)
    earnings_usd = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    created_at = models.DateTimeField(auto_now_add=True)
    started_at = models.DateTimeField(null=True, blank=True)
    finished_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.job_code} - {self.task_type}"
    

class Wallet(models.Model):
    provider = models.OneToOneField(Provider, on_delete=models.CASCADE, related_name="wallet")
    available_balance = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    this_month_spending = models.DecimalField(max_digits=12, decimal_places=2, default=0)

    def __str__(self):
        return f"Wallet(provider_id={self.provider_id})"


class Invoice(models.Model):
    provider = models.ForeignKey(Provider, on_delete=models.CASCADE, related_name="invoices")
    # store billing period as YYYY-MM
    month = models.CharField(max_length=7)  # e.g., "2025-02"
    amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)

    class Meta:
        ordering = ["-month"]
        unique_together = ("provider", "month")

    def __str__(self):
        return f"Invoice(provider_id={self.provider_id}, month={self.month})"


class PaymentMethod(models.Model):
    CARD_TYPES = (("VISA", "Visa"), ("MC", "Mastercard"))

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    provider = models.ForeignKey(Provider, on_delete=models.CASCADE, related_name="payment_methods")
    type = models.CharField(max_length=8, choices=CARD_TYPES)
    last_four = models.CharField(max_length=4)
    expiry_month = models.IntegerField()  # 1..12
    expiry_year = models.IntegerField()   # 4-digit year
    is_default = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.get_type_display()} ••••{self.last_four}"