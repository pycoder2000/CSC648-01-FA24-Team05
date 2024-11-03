import os
from datetime import timedelta
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.environ.get("SECRET_KEY")

# DEBUG = bool(os.environ.get("DEBUG", default=0))
DEBUG = True

if DEBUG:
    ALLOWED_HOSTS = ["localhost", "127.0.0.1", "0.0.0.0", "64.23.143.71"]
else:
    ALLOWED_HOSTS = ["64.23.143.71"]

AUTH_USER_MODEL = "useraccount.User"

SITE_ID = 1

if DEBUG:
    WEBSITE_URL = "http://localhost:8000"
else:
    WEBSITE_URL = "http://64.23.143.71:1337"

CHANNEL_LAYERS = {"default": {"BACKEND": "channels.layers.InMemoryChannelLayer"}}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=60),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),
    "ROTATE_REFRESH_TOKEN": False,
    "BLACKLIST_AFTER_ROTATION": False,
    "UPDATE_LAST_LOGIN": True,
    "SIGNING_KEY": "acomplexkey",
    "ALGORITHM": "HS512",
}

ACCOUNT_USER_MODEL_USERNAME_FIELD = None
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_USERNAME_REQUIRED = False
ACCOUNT_AUTHENTICATION_METHOD = "email"
ACCOUNT_EMAIL_VERIFICATION = "none"

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_PERMISSION_CLASSES": ("rest_framework.permissions.IsAuthenticated",),
}

CORS_ALLOWED_ORIGINS = [
    "http://0.0.0.0:8000",
    "http://0.0.0.0:3000",
    "http://64.23.143.71",
    "http://64.23.143.71:1337",
]

CSRF_TRUSTED_ORIGINS = [
    "http://0.0.0.0:8000",
    "http://0.0.0.0:3000",
    "http://64.23.143.71",
    "http://64.23.143.71:1337",
]

CORS_ORIGINS_WHITELIST = [
    "http://0.0.0.0:8000",
    "http://0.0.0.0:3000",
    "http://64.23.143.71",
    "http://64.23.143.71:1337",
]

CORS_ALLOW_ALL_ORIGINS = True

REST_AUTH = {"USE_JWT": True, "JWT_AUTH_HTTPONLY": False}

# Application definition
INSTALLED_APPS = [
    "daphne",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "rest_framework.authtoken",
    "rest_framework_simplejwt",
    "allauth",
    "allauth.account",
    "allauth.socialaccount",
    "dj_rest_auth",
    "dj_rest_auth.registration",
    "corsheaders",
    "useraccount",
    "item",
    "chat",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "allauth.account.middleware.AccountMiddleware",
]

ROOT_URLCONF = "secondchance_backend.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "secondchance_backend.wsgi.application"
ASGI_APPLICATION = "secondchance_backend.asgi.application"

# Database
DATABASES = {
    "default": {
        "ENGINE": os.environ.get("SQL_ENGINE"),
        "NAME": os.environ.get("SQL_DATABASE"),
        "USER": os.environ.get("SQL_USER"),
        "PASSWORD": os.environ.get("SQL_PASSWORD"),
        "HOST": os.environ.get("SQL_HOST"),
        "PORT": os.environ.get("SQL_PORT"),
    }
}


# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

# Internationalization
LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
STATIC_URL = "static/"
MEDIA_URL = "media/"
MEDIA_ROOT = BASE_DIR / "media"

# Default primary key field type
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
