"""RMR URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
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
from django.urls import path
from apprmr import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/signup/', views.user_signup),
    path('api/login/', views.user_login),
    path('api/logout/<userid>', views.logout),
    path('api/delete/', views.user_delete),
    path('api/profile/', views.user_profile),
    path('api/resume/', views.upload_resume),
    path('api/jobs/', views.upload_job),
    path('api/applicants/<userid>', views.view_job_applicants),
    path('api/status/', views.status_update),
    path('api/apply/', views.apply_for_job),
    path('api/job/<userid>', views.applied_job),
    path('api/all_job/', views.show_job),
    path('api/sent_mail/', views.send_mails),
    path('api/temp/', views.temp),
]
