from rest_framework import serializers
from .models import Property
from property_images.models import PropertyImage


class PropertyImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyImage
        fields = [
            "id",
            "image",
            "is_main",
        ]


class PropertySerializer(serializers.ModelSerializer):
    images = PropertyImageSerializer(
        many=True,
        read_only=True
    )

    class Meta:
        model = Property
        fields = "__all__"