from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import login, authenticate
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user_model,authenticate, login as auth_login
from django.contrib.auth.decorators import login_required, user_passes_test
from rest_framework.decorators import api_view, permission_classes 
from rest_framework_simplejwt.tokens import RefreshToken
from django.views.decorators.http import require_GET
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status, viewsets, generics
from rest_framework.views import APIView
from django.db import transaction
from django.utils import timezone
from decimal import Decimal
import json
from .models import CustomUser,Parceiro,Representante
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomUserSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer,CustomUserSerializer ,ParceiroSerializer,RepresentanteSerializer

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer,

 
User = get_user_model()

def is_administrador(user):
    return user.nivel_acesso == 'administrador'

@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])  # O usuário precisa estar autenticado
def register_usuario(request):
    try:
        user_logado = request.user
        data = request.data

        if user_logado.nivel_acesso == 'administrador':
            # Administrador pode selecionar o nível de acesso
            nivel_acesso = data.get('nivel_acesso', 'cliente')
            if nivel_acesso not in ['cliente', 'funcionario']:
                return JsonResponse({'status': 'error', 'errors': 'Nível de acesso inválido'}, status=400)
        elif user_logado.nivel_acesso == 'funcionario':
            # Funcionário só pode registrar clientes
            nivel_acesso = 'cliente'
        else:
            return JsonResponse({'status': 'error', 'errors': 'Permissão negada'}, status=403)

        user = User.objects.create_user(
            email=data['email'],
            password=data['password'],
            nome_completo=data['nome_completo'],
            cep=data['cep'],
            telefone=data['telefone'],
            endereco=data['endereco'],
            cpf=data['cpf'],
            nivel_acesso=nivel_acesso
        )
        return JsonResponse({'status': 'success', 'message': f'{nivel_acesso.capitalize()} registrado com sucesso!'})
    except Exception as e:
        return JsonResponse({'status': 'error', 'errors': str(e)}, status=400)
@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email')
            password = data.get('password')

            # Authenticate user
            user = authenticate(request, email=email, password=password)

            if user is not None:
                auth_login(request, user)
                refresh = RefreshToken.for_user(user)
                
                # Prepare response data
                response_data = {
                    'status': 'success',
                    'access': str(refresh.access_token),
                    'refresh': str(refresh),
                    'nivel_acesso': user.nivel_acesso  # Inclua o nível de acesso no payload
                }

                return JsonResponse(response_data)

            return JsonResponse({'status': 'error', 'errors': 'Invalid login'}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'errors': 'Invalid JSON'}, status=400)
    return JsonResponse({'status': 'error', 'errors': 'Method not allowed'}, status=405)

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticated]

class ParceiroViewSet(viewsets.ModelViewSet):
    queryset = Parceiro.objects.all()
    serializer_class = ParceiroSerializer
class RepresentanteViewSet(viewsets.ModelViewSet):
    queryset = Representante.objects.all()
    serializer_class = RepresentanteSerializer