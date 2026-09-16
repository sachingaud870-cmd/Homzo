from rest_framework import serializers
from .models import PropertyImage

class PropertyImageUploadSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = PropertyImage
        fields = [
            "id",
            "property",
            "image",
            "image_url",
            "is_main",
        ]
        read_only_fields = ["id", "property"]

    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image:
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None