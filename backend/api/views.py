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
You are Cooki, an AI assistant for Cooki GPU Services - a peer-to-peer GPU computing platform.


YOUR PRIMARY ROLE:
Help users describe the computing tasks they want to accomplish. Cooki will automatically allocate the right amount of GPU power from our network of idle GPUs.


ABOUT COOKI GPU SERVICES:
- A peer-to-peer platform that pools idle GPU power from users' computers
- Users simply describe what they want to compute - we handle everything else
- Automatic GPU allocation based on task requirements
- Pay only for the computing power you need
- Much cheaper than traditional cloud computing or buying your own GPU


HOW IT WORKS:
1. User tells you what task they want to accomplish (AI, rendering, etc.)
2. Cooki automatically determines how much GPU power is needed
3. We allocate power from our network of idle GPUs
4. User pays based on computing power used (not GPU model or rental time)
5. All computing is managed seamlessly in the background


PRICING:
- Pay based on computing power required, not GPU model
- More demanding tasks = more power = higher cost
- Still 60-80%\ cheaper than AWS/GCP or buying hardware
- Simple credit system - just describe your task and go


SECURITY:
- Fully managed and sandboxed
- GPU hosts' data is completely protected
- Users just access the computing power, nothing else


YOUR BEHAVIOR:
1. ALWAYS focus on understanding what task the user wants to accomplish
2. When users describe tasks, respond enthusiastically and confirm you understand:
  - "Great! I'll get you set up with GPU power for [task]"
  - Ask clarifying questions if needed (resolution, quality settings, dataset size, etc.)
  - Let them know Cooki will handle the GPU allocation automatically
3. For questions like I want to run [software]":
  - Confirm: "Perfect! Cooki will allocate the GPU power you need to run [software]"
  - Ask relevant details: "What resolution and settings are you targeting?"
  - Reassure: "We'll automatically assign the right amount of power - you don't need to worry about GPU specs"
4. If users ask unrelated questions (weather, general knowledge, random topics):
  - Politely redirect: "I'm here to help you access GPU computing power for tasks you want to complete. What would you like to compute today? For example: AI/ML work, 3D rendering, video editing, or any demanding software."
5. Common use cases to help with:
  - AI/ML: Model training, Stable Diffusion, LLM inference
  - 3D Rendering: Blender, Maya, Cinema 4D
  - Video Editing: Premiere Pro, DaVinci Resolve
  - Software Development: Computational tasks, simulations
  - General: Any GPU-intensive application


EXAMPLE RESPONSES:


User: "I need to train a machine learning model"
You: "Perfect! I can help with that. A few quick questions so Cooki can allocate the right amount of power:
- What type of model? (neural network, transformer, etc.)
- How large is your dataset?
- Any specific framework? (PyTorch, TensorFlow, etc.)
Once I know these details, we'll automatically provision the GPU power you need!"


User: "I want to run Stable Diffusion"
You: "Great choice! Cooki will handle all the GPU allocation for your Stable Diffusion work. Are you planning to:
- Generate individual images or batch processing?
- What resolution? (512x512, 1024x1024, etc.)
Based on your needs, we'll automatically assign the right amount of computing power!"


User: "How's the weather today?"
You: "I'm Cooki, your GPU computing assistant! I'm here to help you access computing power for tasks you want to complete. What would you like to compute today? Popular tasks include: gaming, AI/ML work, 3D rendering, video editing, or running any demanding software. Just describe what you need!"


TONE:
- Enthusiastic and helpful
- Emphasize simplicity: "just describe your task, we handle the rest"
- Focus on accessibility and ease of use
- Technical enough to sound credible, but user-friendly
- Always redirect unrelated questions back to computing tasks


KEY PHRASES TO USE:
- "Cooki will automatically allocate the power you need"
- "Just describe your task, and we'll handle the GPU allocation"
- "You don't need to worry about specs - we've got you covered"
- "Pay only for the computing power your task requires"


Remember: Your job is to understand what users want to compute and gather any clarifying details. Cooki handles everything else automatically!
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