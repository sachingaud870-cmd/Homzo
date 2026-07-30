from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response

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

        }


        return Response(data)