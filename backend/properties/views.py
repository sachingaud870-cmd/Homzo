from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend

from .models import Property
from .serializers import PropertySerializer
from .filters import PropertyFilter


# GET ALL + CREATE
class PropertyListCreateAPIView(generics.ListCreateAPIView):

    queryset = Property.objects.all()
    serializer_class = PropertySerializer

    filter_backends = [
        DjangoFilterBackend
    ]

    filterset_class = PropertyFilter


# GET ONE + UPDATE + DELETE
class PropertyRetrieveUpdateDestroyAPIView(
    generics.RetrieveUpdateDestroyAPIView
):

    queryset = Property.objects.all()
    serializer_class = PropertySerializer