from rest_framework import serializers
from .models import CustomUser,Parceiro,Representante, Procedimento,Tuss,Especialidade,Parceiro,PessoaFisica,Endereco,Agendamento

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

class ParceiroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parceiro
        fields = '__all__'
class RepresentanteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Representante
        fields = '__all__'
class ProcedimentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Procedimento
        fields = '__all__'
class TussSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tuss
        fields = '__all__'  # Inclui todos os campos do modelo
class EspecialidadeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Especialidade
        fields = '__all__'  # Inclui todos os campos do modelo
class ParceiroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parceiro
        fields = '__all__'  
class PessoaFisicaSerializer(serializers.ModelSerializer):
     class Meta:
        model = PessoaFisica
        fields = '__all__' 
class EnderecoSerializer(serializers.ModelSerializer):
     class Meta:
        model = Endereco
        fields = '__all__' 
class AgendamentoSerializer(serializers.ModelSerializer):
     class Meta:
        model = Agendamento
        fields = '__all__' 

