from rest_framework import generics
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.pagination import PageNumberPagination
from django_filters.rest_framework import DjangoFilterBackend

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
