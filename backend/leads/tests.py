from datetime import date, timedelta

from django.urls import reverse
from rest_framework.test import APITestCase

from leads.models import Lead
from properties.models import Property


class LeadFollowUpTests(APITestCase):
    def setUp(self):
        self.property = Property.objects.create(
            project_name="Sunrise Towers",
            builder_name="Bright Developers",
            location="Vasai",
            bhk="2BHK",
            carpet_area=900,
            price="6500000",
            rera_number="RERA-001",
            description="A premium 2BHK project.",
        )
        self.lead = Lead.objects.create(
            property=self.property,
            name="Asha Patel",
            mobile="9876543210",
            email="asha@example.com",
            location="Vasai",
            budget="70L",
            message="Interested in the project.",
        )

    def test_update_follow_up_details_via_api(self):
        response = self.client.patch(
            reverse("lead-detail", kwargs={"pk": self.lead.pk}),
            {
                "follow_up_date": "2026-08-10",
                "follow_up_note": "Call again after lunch",
                "preferred_channel": "WHATSAPP",
            },
            format="json",
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["follow_up_date"], "2026-08-10")
        self.assertEqual(response.json()["follow_up_note"], "Call again after lunch")
        self.assertEqual(response.json()["preferred_channel"], "WHATSAPP")

    def test_send_follow_up_message_payload(self):
        response = self.client.post(
            reverse("lead-automation", kwargs={"pk": self.lead.pk}),
            {"channel": "WHATSAPP"},
            format="json",
        )

        self.assertEqual(response.status_code, 200)
        self.assertIn("wa.me", response.json()["link"])
        self.assertIn(self.lead.name, response.json()["body"])

    def test_dashboard_stats_include_follow_up_summary(self):
        Lead.objects.create(
            property=self.property,
            name="Nikhil",
            mobile="9999999999",
            email="nikhil@example.com",
            location="Virar",
            budget="80L",
            message="Needs a callback",
            follow_up_date=date.today(),
        )
        Lead.objects.create(
            property=self.property,
            name="Riya",
            mobile="8888888888",
            email="riya@example.com",
            location="Naigaon",
            budget="90L",
            message="Follow-up overdue",
            follow_up_date=date.today() - timedelta(days=2),
        )

        response = self.client.get(reverse("dashboard-stats"))

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["follow_up_due_today"], 1)
        self.assertEqual(response.json()["follow_up_overdue"], 1)
