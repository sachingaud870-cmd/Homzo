from django.urls import path
from .views import (
    PropertyListCreateAPIView,
    PropertyRetrieveUpdateDestroyAPIView,
)
from property_images.views import PropertyImageUploadAPIView

urlpatterns = [

    # GET ALL + CREATE
    path(
        "",
        PropertyListCreateAPIView.as_view(),
        name="property-list",
    ),

    # GET ONE + UPDATE + DELETE
    path(
        "<int:pk>/",
        PropertyRetrieveUpdateDestroyAPIView.as_view(),
        name="property-detail",
    ),
    path(
        "<int:pk>/images/",
        PropertyImageUploadAPIView.as_view(),
        name="property-image-upload",
    ),

]
