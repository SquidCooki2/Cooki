from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Provider, Job
from .serializers import ProviderSerializer, JobSerializer
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404

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