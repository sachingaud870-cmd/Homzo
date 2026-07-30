from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Count

from properties.models import Property
from leads.models import Lead



class DashboardStatsAPIView(APIView):

    def get(self, request):

        data = {

            "total_properties":
                Property.objects.count(),


            "total_leads":
                Lead.objects.count(),


            "new_leads":
                Lead.objects.filter(
                    status="NEW"
                ).count(),


            "contacted_leads":
                Lead.objects.filter(
                    status="CONTACTED"
                ).count(),


            "interested_leads":
                Lead.objects.filter(
                    status="INTERESTED"
                ).count(),


            "closed_leads":
                Lead.objects.filter(
                    status="CLOSED"
                ).count(),

            "leads_by_status": list(
                Lead.objects.values("status")
                .annotate(count=Count("id"))
                .order_by("status")
            ),

            "leads_by_location": list(
                Lead.objects.exclude(location="")
                .values("location")
                .annotate(count=Count("id"))
                .order_by("-count", "location")[:5]
            ),

        }


        return Response(data)
