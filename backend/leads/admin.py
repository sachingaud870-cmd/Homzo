from django.contrib import admin
from .models import Lead


@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):

    list_display = (
        "name",
        "mobile",
        "property",
        "budget",
        "created_at",
    )

    search_fields = (
        "name",
        "mobile",
        "email",
    )