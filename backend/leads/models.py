from django.db import models
from properties.models import Property


class Lead(models.Model):

    property = models.ForeignKey(
        Property,
        on_delete=models.CASCADE,
        related_name="leads"
        , null=True,
        blank=True,
    )

    name = models.CharField(
        max_length=100
    )

    mobile = models.CharField(
        max_length=15
    )

    email = models.EmailField(
        blank=True
    )

    location = models.CharField(
        max_length=100
    )

    budget = models.CharField(
        max_length=100
    )

    message = models.TextField(
        blank=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )


    def __str__(self):
        return self.name

    status = models.CharField(
    max_length=20,
    choices=[
        ("NEW","NEW"),
        ("CONTACTED","CONTACTED"),
        ("INTERESTED","INTERESTED"),
        ("CLOSED","CLOSED"),
    ],
    default="NEW"
)
