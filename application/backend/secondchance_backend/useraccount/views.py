from dj_rest_auth.registration.views import RegisterView
from .serializers import CustomRegisterSerializer


class CustomRegisterView(RegisterView):
    """
    Custom registration view for user registration.
    Overrides the default RegisterView to use the CustomRegisterSerializer.

    Attributes:
        serializer_class (CustomRegisterSerializer): Specifies the serializer to be used for handling registration data.
    """

    serializer_class = CustomRegisterSerializer
