from django.contrib import admin
from django.urls import path, include
from . import views
from rest_framework.authtoken.views import obtain_auth_token
urlpatterns = [
    path('register/', views.user_signup),
    path('login/', views.user_login),
    path('auth/token/',obtain_auth_token),
    path('logout/<userid>/', views.Logout),
]