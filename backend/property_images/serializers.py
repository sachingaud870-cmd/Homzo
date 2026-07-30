from rest_framework import serializers

from .models import PropertyImage


class PropertyImageUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyImage
        fields = ["id", "property", "image", "is_main"]
        read_only_fields = ["id", "property"]
