"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.http import HttpResponse
from django.urls import path, include
from api import views

def api_root(request):
    return HttpResponse("Django API is running")


urlpatterns = [
    path('', api_root),
    path('api/', views.api_overview),
    path('api/providers/', views.get_providers),
    path('api/jobs/', views.get_jobs),
    path('api/jobs/create/', views.create_job),
    path('admin/', admin.site.urls),
    path('api/providers/<int:provider_id>/dashboard/', views.provider_dashboard),
    path('api/providers/<int:provider_id>/wallet/', views.provider_wallet),
    path('api/chat/', views.chat),
]
