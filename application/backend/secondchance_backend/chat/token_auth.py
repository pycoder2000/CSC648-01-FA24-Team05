from django.contrib.auth.models import AnonymousUser
from channels.db import database_sync_to_async
from channels.middleware import BaseMiddleware
from rest_framework_simplejwt.tokens import AccessToken
from useraccount.models import User


@database_sync_to_async
def get_user(token_key):
    """
    Retrieve a user object based on the provided token key asynchronously.

    :param token_key: The token key used to authenticate the user.
    :type token_key: str
    :return: The user object if found, otherwise an AnonymousUser object.
    :rtype: User or AnonymousUser
    """
    try:
        token = AccessToken(token_key)
        user_id = token.payload["user_id"]
        return User.objects.get(pk=user_id)
    except Exception:
        return AnonymousUser


class TokenAuthMiddleware(BaseMiddleware):
    """
    Middleware class for token-based authentication.

    :param inner: The inner application to wrap.
    :type inner: callable
    """

    def __init__(self, inner):
        """
        Initialize the middleware with the inner application.

        :param inner: The inner application to wrap.
        :type inner: callable
        """
        self.inner = inner

    async def __call__(self, scope, receive, send):
        """
        Asynchronously handle incoming requests by extracting the token from the query string,
        getting user information using the token, and passing the request to the inner application.

        :param scope: The context of the request.
        :type scope: dict
        :param receive: The receive channel.
        :type receive: callable
        :param send: The send channel.
        :type send: callable
        :return: The response after processing the request.
        :rtype: callable
        """
        query = dict((x.split("=") for x in scope["query_string"].decode().split("&")))
        token_key = query.get("token")
        scope["user"] = await get_user(token_key)
        return await super().__call__(scope, receive, send)
