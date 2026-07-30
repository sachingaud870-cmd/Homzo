from rest_framework import serializers
from .models import Lead


class LeadSerializer(serializers.ModelSerializer):

    class Meta:
        model = Lead

        fields = [
            "id",
            "property",
            "name",
            "mobile",
            "email",
            "location",
            "budget",
            "message",
            "status",
            "created_at",
        ]

        read_only_fields = [
            "id",
            "created_at",
        ]