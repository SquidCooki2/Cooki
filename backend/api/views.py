from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Provider, Job
from .serializers import ProviderSerializer, JobSerializer
from django.contrib.auth.models import User

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
        serializer.save(customer=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_jobs(request):
    jobs = Job.objects.all().order_by('-created_at')
    serializer = JobSerializer(jobs, many=True)
    return Response(serializer.data)