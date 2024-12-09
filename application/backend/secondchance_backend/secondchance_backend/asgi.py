import os
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from django.core.asgi import get_asgi_application
from chat import routing
from chat.token_auth import TokenAuthMiddleware

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "secondchance_backend.settings")

application = ProtocolTypeRouter(
    {
        "http": get_asgi_application(),
        "websocket": AllowedHostsOriginValidator(
            TokenAuthMiddleware(
                AuthMiddlewareStack(URLRouter(routing.websocket_urlpatterns))
            )
        ),
    }
)
