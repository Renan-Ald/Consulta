from rest_framework import serializers
from .models import CustomUser

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Adicionar informações ao token se necessário
        return token
class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'nome_completo', 'cep', 'telefone', 'endereco', 'cpf', 'nivel_acesso']