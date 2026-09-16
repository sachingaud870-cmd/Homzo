from django.urls import path

from .views import (
    LeadListAPIView,
    LeadDetailAPIView,
    LeadAutomationAPIView,
)



urlpatterns = [

    path(
        "",
        LeadListAPIView.as_view(),
        name="lead-list"
    ),


    path(
        "<int:pk>/",
        LeadDetailAPIView.as_view(),
        name="lead-detail"
    ),

    path(
        "<int:pk>/automate/",
        LeadAutomationAPIView.as_view(),
        name="lead-automation"
    ),

]