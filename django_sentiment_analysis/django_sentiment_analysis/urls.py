"""
URL configuration for django_sentiment_analysis project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
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
# from django.contrib import admin
# from django.urls import path

# urlpatterns = [
#     path("admin/", admin.site.urls),
# ]
from django.urls import include, path
from rest_framework import routers
from authentication import views
from sentiment_analysis import views as sentiment_analysis_views
router = routers.DefaultRouter()


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path("", include(router.urls)),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
    path("api/register/", views.RegisterView.as_view(), name="auth_register"),
    path("api/login/", views.LoginView.as_view(), name="auth_login"),
    path("logout/", views.LogoutView.as_view(), name="auth_logout"),
    path("api/analyze/", sentiment_analysis_views.AnalyzeView.as_view(), name="analyze"),
]
