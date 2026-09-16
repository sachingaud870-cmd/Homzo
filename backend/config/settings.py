"""
Django settings for config project.

Homzo Backend
Django 6.x
"""

from pathlib import Path
from datetime import timedelta

from decouple import config, Csv
import dj_database_url


# ============================================================
# BASE DIRECTORY
# ============================================================

BASE_DIR = Path(__file__).resolve().parent.parent


# ============================================================
# DATABASE
# ============================================================

DATABASE_URL = config("DATABASE_URL", default="")

if DATABASE_URL:
    DATABASES = {
        "default": dj_database_url.parse(
            DATABASE_URL,
            conn_max_age=600,
            conn_health_checks=True,
        )
    }
else:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.postgresql",
            "NAME": config("DB_NAME"),
            "USER": config("DB_USER"),
            "PASSWORD": config("DB_PASSWORD"),
            "HOST": config("DB_HOST", default="localhost"),
            "PORT": config("DB_PORT", default="5432"),
        }
    }


# ============================================================
# SECURITY
# ============================================================

SECRET_KEY = config("SECRET_KEY")

DEBUG = config(
    "HOMZO_DEBUG",
    default=False,
    cast=bool,
)

ALLOWED_HOSTS = config(
    "ALLOWED_HOSTS",
    default="localhost,127.0.0.1",
    cast=Csv(),
)


# ============================================================
# APPLICATIONS
# ============================================================

INSTALLED_APPS = [

    # Django Core
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    # Cloudinary
    "cloudinary_storage",
    "cloudinary",

    # Third Party
    "rest_framework",
    "rest_framework_simplejwt",
    "django_filters",
    "corsheaders",

    # Local Apps
    "users",
    "accounts",
    "properties",
    "property_images",
    "leads",
    "dashboard",
]


# ============================================================
# MIDDLEWARE
# ============================================================

MIDDLEWARE = [

    # Security must be first
    "django.middleware.security.SecurityMiddleware",

    # WhiteNoise serves Django static files
    "whitenoise.middleware.WhiteNoiseMiddleware",

    # CORS
    "corsheaders.middleware.CorsMiddleware",

    # Sessions
    "django.contrib.sessions.middleware.SessionMiddleware",

    # Common Django middleware
    "django.middleware.common.CommonMiddleware",

    # CSRF
    "django.middleware.csrf.CsrfViewMiddleware",

    # Authentication
    "django.contrib.auth.middleware.AuthenticationMiddleware",

    # Messages
    "django.contrib.messages.middleware.MessageMiddleware",

    # Clickjacking protection
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]


# ============================================================
# URL / WSGI
# ============================================================

ROOT_URLCONF = "config.urls"

WSGI_APPLICATION = "config.wsgi.application"


# ============================================================
# TEMPLATES
# ============================================================

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",

        "DIRS": [],

        "APP_DIRS": True,

        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",

                "django.contrib.auth.context_processors.auth",

                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]


# ============================================================
# PASSWORD VALIDATION
# ============================================================

AUTH_PASSWORD_VALIDATORS = [

    {
        "NAME":
            "django.contrib.auth.password_validation."
            "UserAttributeSimilarityValidator",
    },

    {
        "NAME":
            "django.contrib.auth.password_validation."
            "MinimumLengthValidator",
    },

    {
        "NAME":
            "django.contrib.auth.password_validation."
            "CommonPasswordValidator",
    },

    {
        "NAME":
            "django.contrib.auth.password_validation."
            "NumericPasswordValidator",
    },
]


# ============================================================
# INTERNATIONALIZATION
# ============================================================

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True


# ============================================================
# STATIC FILES
# ============================================================

STATIC_URL = "/static/"

STATIC_ROOT = BASE_DIR / "staticfiles"


# ============================================================
# MEDIA FILES
# ============================================================

MEDIA_URL = "/media/"

MEDIA_ROOT = BASE_DIR / "media"


# ============================================================
# CLOUDINARY
# ============================================================
#
# Uploaded property images/files
#              ↓
#          Cloudinary
#
# This is used by Django's default file storage.
#

CLOUDINARY_STORAGE = {
    "CLOUD_NAME": config(
        "CLOUDINARY_CLOUD_NAME"
    ),

    "API_KEY": config(
        "CLOUDINARY_API_KEY"
    ),

    "API_SECRET": config(
        "CLOUDINARY_API_SECRET"
    ),
}


# ============================================================
# STORAGE CONFIGURATION
# ============================================================
#
# default:
#   User uploaded files → Cloudinary
#
# staticfiles:
#   CSS / JS / Django admin static files → WhiteNoise
#
# Django 4.2+ / 5.x / 6.x uses STORAGES for this.
#

STORAGES = {

    # --------------------------------------------------------
    # USER UPLOADS
    # --------------------------------------------------------
    "default": {
        "BACKEND": (
            "cloudinary_storage.storage.MediaCloudinaryStorage"
        ),
    },

    # --------------------------------------------------------
    # STATIC FILES
    # --------------------------------------------------------
    "staticfiles": {
        "BACKEND": (
            "whitenoise.storage.CompressedStaticFilesStorage"
        ),
    },
}

# Compatibility for django-cloudinary-storage 0.3.0
STATICFILES_STORAGE = (
    "whitenoise.storage.CompressedStaticFilesStorage"
)


# ============================================================
# CORS
# ============================================================

CORS_ALLOWED_ORIGINS = config(
    "CORS_ALLOWED_ORIGINS",

    default=(
        "http://localhost:3000,"
        "http://127.0.0.1:3000,"
        "https://homzo-gamma.vercel.app"
    ),

    cast=Csv(),
)


# ============================================================
# CSRF
# ============================================================

CSRF_TRUSTED_ORIGINS = config(
    "CSRF_TRUSTED_ORIGINS",

    default=(
        "http://localhost:3000,"
        "http://127.0.0.1:3000,"
        "https://homzo-gamma.vercel.app"
    ),

    cast=Csv(),
)


# ============================================================
# EMAIL
# ============================================================

EMAIL_BACKEND = config(
    "EMAIL_BACKEND",

    default=(
        "django.core.mail.backends.console.EmailBackend"
    ),
)

EMAIL_HOST = config(
    "EMAIL_HOST",
    default="",
)

EMAIL_PORT = config(
    "EMAIL_PORT",
    default=587,
    cast=int,
)

EMAIL_HOST_USER = config(
    "EMAIL_HOST_USER",
    default="",
)

EMAIL_HOST_PASSWORD = config(
    "EMAIL_HOST_PASSWORD",
    default="",
)

EMAIL_USE_TLS = config(
    "EMAIL_USE_TLS",
    default=True,
    cast=bool,
)

DEFAULT_FROM_EMAIL = config(
    "DEFAULT_FROM_EMAIL",
    default="noreply@homzo.local",
)


# ============================================================
# PRODUCTION SECURITY
# ============================================================

if not DEBUG:

    # Render HTTPS proxy support
    SECURE_PROXY_SSL_HEADER = (
        "HTTP_X_FORWARDED_PROTO",
        "https",
    )

    # Redirect HTTP → HTTPS
    SECURE_SSL_REDIRECT = True

    # HSTS
    SECURE_HSTS_SECONDS = 31536000

    SECURE_HSTS_INCLUDE_SUBDOMAINS = True

    # Secure cookies
    SESSION_COOKIE_SECURE = True

    CSRF_COOKIE_SECURE = True


# ============================================================
# DJANGO REST FRAMEWORK
# ============================================================

REST_FRAMEWORK = {

    "DEFAULT_AUTHENTICATION_CLASSES": (

        "rest_framework_simplejwt.authentication."
        "JWTAuthentication",

    ),

    "DEFAULT_FILTER_BACKENDS": [

        "django_filters.rest_framework."
        "DjangoFilterBackend",

    ],
}


# ============================================================
# JWT
# ============================================================

SIMPLE_JWT = {

    "ACCESS_TOKEN_LIFETIME": timedelta(
        hours=12
    ),

    "REFRESH_TOKEN_LIFETIME": timedelta(
        days=7
    ),
}


# ============================================================
# DEFAULT PRIMARY KEY
# ============================================================

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"