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
            "follow_up_date",
            "follow_up_note",
            "preferred_channel",
        ]

        read_only_fields = [
            "id",
            "created_at",
        ]