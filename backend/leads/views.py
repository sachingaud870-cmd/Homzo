from django.shortcuts import render

# Create your views here.
from rest_framework import generics

from .models import Lead
from .serializers import LeadSerializer



class LeadListAPIView(
    generics.ListCreateAPIView
):

    queryset = Lead.objects.all()

    serializer_class = LeadSerializer





class LeadDetailAPIView(
    generics.RetrieveUpdateAPIView
):

    queryset = Lead.objects.all()

    serializer_class = LeadSerializer