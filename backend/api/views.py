from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Provider, Job
from .serializers import ProviderSerializer, JobSerializer
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from .models import Provider, Wallet
from .serializers import WalletSerializer

@api_view(['GET'])
def api_overview(request):
    routes = {
        'List Providers': '/api/providers/',
        'Provider Detail': '/api/providers/<id>/',
        'List Jobs': '/api/jobs/',
        'Create Job': '/api/jobs/',
        'Job Detail': '/api/jobs/<id>/',
    }
    return Response(routes)

@api_view(['GET'])
def get_providers(request):
    providers = Provider.objects.filter(is_online=True)
    serializer = ProviderSerializer(providers, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_job(request):
    serializer = JobSerializer(data=request.data)
    if serializer.is_valid():
        # handle unauthenticated users gracefully
        customer = request.user if getattr(request.user, "is_authenticated", False) else None
        serializer.save(customer=customer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_jobs(request):
    jobs = Job.objects.all().order_by('-created_at')
    serializer = JobSerializer(jobs, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def provider_dashboard(request, provider_id):
    provider = get_object_or_404(Provider, id=provider_id)

    # Get current and recent jobs
    current_job = Job.objects.filter(provider=provider, status__in=['RUNNING', 'QUEUED']).first()
    recent_jobs = Job.objects.filter(provider=provider, status='SUCCEEDED').order_by('-finished_at')[:5]

    data = {
        "provider": {
            "id": provider.id,
            "name": provider.name or provider.user.username if provider.user else None,
            "gpu_name": provider.gpu_name,
            "vram_gb": provider.vram_gb,
            "base_clock_ghz": provider.base_clock_ghz,
            "boost_clock_ghz": provider.boost_clock_ghz,
            "cuda_cores": provider.cuda_cores,
            "gpu_usage": provider.gpu_usage,
            "temperature_c": provider.temperature_c,
            "total_earned": float(provider.total_earned),
            "jobs_completed": provider.jobs_completed,
            "uptime_percent": provider.uptime_percent,
            "rating": provider.rating,
            "username": provider.user.username,
            "is_online": provider.is_online,
        },
        "current_job": {
            "job_code": current_job.job_code if current_job else None,
            "task_type": current_job.task_type if current_job else None,
            "progress_percent": current_job.progress_percent if current_job else 0,
            "time_elapsed": str(current_job.time_elapsed) if current_job else None,
            "earnings_usd": float(current_job.earnings_usd) if current_job else 0,
        } if current_job else None,
        "recent_jobs": [
            {
                "job_code": j.job_code,
                "task_type": j.task_type,
                "earnings_usd": float(j.earnings_usd),
                "duration": str(j.time_elapsed),
                "status": j.status,
            }
            for j in recent_jobs
        ]
    }

    return Response(data)

@api_view(['GET'])
def provider_wallet(request, provider_id: int):
    provider = get_object_or_404(Provider, id=provider_id)
    # ensure a wallet exists for this provider
    wallet, _ = Wallet.objects.get_or_create(provider=provider)
    data = WalletSerializer(wallet).data
    return Response(data)

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import openai
import os

openai.api_key = os.getenv("OPENAI_API_KEY")

# Custom context for your assistant
SITE_CONTEXT = """
The Product: Cooki GPU Services is a peer-to-peer marketplace.
Hosts: Users who install the Cooki Host application to securely rent out their idle GPU processing power.
Renters (or Clients): Users who use the Cooki Client application to connect to a Host's GPU to run demanding applications.
Pricing Model:
Renters pay per minute of compute time. Prices vary based on the GPU model (e.g., an RTX 4090 is more expensive than an RTX 3060).
Hosts earn a percentage of the rental fee. Cooki takes a small platform fee.
Payments are handled through a secure, pre-loaded credit system (Cooki Credits).
Key Processes:
Account Setup: Users sign up, verify their email, and add a payment method to buy Cooki Credits.
Compute Request: A Renter browses available GPUs, selects one based on their needs (power, price), and initiates a session.
Power Allocation: This refers to the Renter's process of choosing the right GPU. I can help by asking what app they're using (e.g., "For Stable Diffusion, you'll want at least 12GB of VRAM").
Security: The Cooki Host app creates a secure, sandboxed environment. Renters cannot access any of the Host's personal files or system data.
"""

@csrf_exempt  # easier during dev (add proper CSRF later)
def chat_view(request):
    if request.method == "POST":
        data = json.loads(request.body)
        message = data.get("message", "")

        response = openai.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": SITE_CONTEXT},
                {"role": "user", "content": message},
            ]
        )

        reply = response.choices[0].message.content
        return JsonResponse({"reply": reply})
    return JsonResponse({"error": "POST only"}, status=400)