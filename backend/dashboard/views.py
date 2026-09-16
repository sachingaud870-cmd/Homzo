from django.shortcuts import render

# Create your views here.
from datetime import date, timedelta

from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Count, Q
from django.utils import timezone

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

            "follow_up_due_today": Lead.objects.filter(
                follow_up_date=date.today()
            ).count(),

            "follow_up_overdue": Lead.objects.filter(
                follow_up_date__lt=date.today()
            ).count(),

            "conversion_rate": round(
                (Lead.objects.filter(status="CLOSED").count() / Lead.objects.count() * 100)
                if Lead.objects.count() else 0,
                2,
            ),

            "weekly_leads": list(
                Lead.objects.filter(created_at__gte=timezone.now() - timedelta(days=7))
                .extra({"day": "date(created_at)"})
                .values("day")
                .annotate(count=Count("id"))
                .order_by("day")
            ),

            "top_properties": list(
                Property.objects.values("project_name", "location")
                .annotate(lead_count=Count("leads"))
                .order_by("-lead_count")[:5]
            ),

        }


        return Response(data)
