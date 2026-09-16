from rest_framework import generics, status
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.pagination import PageNumberPagination
from django_filters.rest_framework import DjangoFilterBackend
from django.core.mail import send_mail
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Lead
from .serializers import LeadSerializer
from .filters import LeadFilter


class LeadPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = "page_size"
    max_page_size = 100



class LeadListAPIView(
    generics.ListCreateAPIView
):

    queryset = Lead.objects.select_related("property").order_by("-created_at")

    serializer_class = LeadSerializer
    pagination_class = LeadPagination
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = LeadFilter
    search_fields = ["name", "mobile", "email", "location", "budget"]
    ordering_fields = ["created_at", "name", "status"]
    ordering = ["-created_at"]





class LeadDetailAPIView(
    generics.RetrieveUpdateAPIView
):

    queryset = Lead.objects.all()

    serializer_class = LeadSerializer


class LeadAutomationAPIView(APIView):
    def post(self, request, pk):
        lead = Lead.objects.filter(pk=pk).first()
        if not lead:
            return Response({"detail": "Lead not found"}, status=status.HTTP_404_NOT_FOUND)

        channel = request.data.get("channel", "WHATSAPP").upper()
        if channel == "WHATSAPP":
            encoded = ":".join([lead.mobile, lead.name])
            link = f"https://wa.me/{lead.mobile}?text={encoded}"
            body = f"Hi {lead.name}, we are following up on your enquiry about {lead.property.project_name if lead.property else 'our properties'}."
            return Response({"channel": channel, "link": link, "body": body, "status": "prepared"})

        if channel == "EMAIL":
            body = f"Hi {lead.name}, this is a follow-up for your property enquiry."
            subject = "Follow-up on your property enquiry"
            recipient = lead.email or ""
            if recipient:
                send_mail(subject, body, None, [recipient], fail_silently=False)
            return Response({"channel": channel, "body": body, "to": recipient, "status": "sent" if recipient else "skipped"})

        return Response({"channel": channel, "body": f"Call {lead.name} at {lead.mobile}"})
