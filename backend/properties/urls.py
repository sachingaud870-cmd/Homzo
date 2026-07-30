from django.urls import path

from .views import (
    PropertyListCreateAPIView,
    PropertyRetrieveUpdateDestroyAPIView,
)

from property_images.views import (
    PropertyImageUploadAPIView,
    PropertyImageDeleteAPIView,
)


urlpatterns = [

    # GET ALL + CREATE PROPERTY
    path(
        "",
        PropertyListCreateAPIView.as_view(),
        name="property-list",
    ),

    # GET ONE + UPDATE + DELETE PROPERTY
    path(
        "<int:pk>/",
        PropertyRetrieveUpdateDestroyAPIView.as_view(),
        name="property-detail",
    ),

    # UPLOAD PROPERTY IMAGES
    path(
        "<int:pk>/images/",
        PropertyImageUploadAPIView.as_view(),
        name="property-image-upload",
    ),

    # DELETE PROPERTY IMAGE
    path(
        "images/<int:pk>/delete/",
        PropertyImageDeleteAPIView.as_view(),
        name="property-image-delete",
    ),

]