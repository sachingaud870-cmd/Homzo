from django.urls import path

from .views import (
    PropertyListCreateAPIView,
    PropertyRetrieveUpdateDestroyAPIView,
    PropertyRecommendationAPIView,
)

from property_images.views import (
    PropertyImageDeleteAPIView,
    PropertyImageSetMainAPIView,
    PropertyImageUploadAPIView,
)


urlpatterns = [

    # ==========================================
    # GET ALL + CREATE PROPERTY
    # ==========================================
    path(
        "",
        PropertyListCreateAPIView.as_view(),
        name="property-list",
    ),

    # ==========================================
    # AI PROPERTY RECOMMENDATIONS
    # ==========================================
    path(
        "recommendations/",
        PropertyRecommendationAPIView.as_view(),
        name="property-recommendations",
    ),

    # ==========================================
    # GET ONE + UPDATE + DELETE PROPERTY
    # ==========================================
    path(
        "<int:pk>/",
        PropertyRetrieveUpdateDestroyAPIView.as_view(),
        name="property-detail",
    ),

    # ==========================================
    # UPLOAD PROPERTY IMAGES
    # ==========================================
    path(
        "<int:pk>/images/",
        PropertyImageUploadAPIView.as_view(),
        name="property-image-upload",
    ),

    # ==========================================
    # DELETE PROPERTY IMAGE
    # ==========================================
    path(
        "images/<int:pk>/delete/",
        PropertyImageDeleteAPIView.as_view(),
        name="property-image-delete",
    ),

    # ==========================================
    # SET MAIN PROPERTY IMAGE
    # ==========================================
    path(
        "images/<int:pk>/set-main/",
        PropertyImageSetMainAPIView.as_view(),
        name="property-image-set-main",
    ),
]