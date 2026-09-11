from django.contrib import admin
from django.urls import path, include

from .views import home

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [

    # Home
    path(
        "",
        home,
    ),

    # Django Admin
    path(
        "admin/",
        admin.site.urls,
    ),

    # Properties
    path(
        "api/properties/",
        include("properties.urls"),
    ),

    # Leads
    path(
        "api/leads/",
        include("leads.urls"),
    ),

    # Dashboard
    path(
        "api/dashboard/",
        include("dashboard.urls"),
    ),

    # Authentication
    path(
        "api/auth/",
        include("users.urls"),
    ),

    # Login / JWT
    path(
        "api/login/",
        TokenObtainPairView.as_view(),
        name="token_obtain_pair",
    ),

    # Refresh Token
    path(
        "api/token/refresh/",
        TokenRefreshView.as_view(),
        name="token_refresh",
    ),

    # Accounts
    path(
        "api/",
        include("accounts.urls"),
    ),
]