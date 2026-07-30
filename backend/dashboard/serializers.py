from rest_framework import serializers


class DashboardStatsSerializer(serializers.Serializer):

    total_properties = serializers.IntegerField()

    total_leads = serializers.IntegerField()

    active_properties = serializers.IntegerField()

    saved_properties = serializers.IntegerField()