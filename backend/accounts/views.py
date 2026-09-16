from django.http import JsonResponse
from django.contrib.auth.models import User

from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import RegisterSerializer
from .serializers import UserProfileSerializer


def home(request):
    return JsonResponse({
        "message": "Welcome to Homzo API"
    })


class RegisterAPIView(CreateAPIView):

    queryset = User.objects.all()

    serializer_class = RegisterSerializer


class UserProfileAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        serializer = UserProfileSerializer(request.user)

        return Response(serializer.data)