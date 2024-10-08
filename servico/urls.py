from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import login_view, register_usuario, UserViewSet,CustomTokenObtainPairView,ParceiroViewSet,RepresentanteViewSet,ProcedimentoViewSet,TussViewSet,EspecialidadeViewSet,PessoaFisicaViewSet,EnderecoViewSet,AgendamentoViewSet
router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'parceiros', ParceiroViewSet)
router.register(r'representantes', RepresentanteViewSet)
router.register(r'procedimentos', ProcedimentoViewSet)
router.register(r'tuss', TussViewSet)
router.register(r'especialidade', EspecialidadeViewSet)
router.register(r'pessoa_fisica', PessoaFisicaViewSet)
router.register(r'endereco', EnderecoViewSet)
router.register(r'agendamento', AgendamentoViewSet)
urlpatterns = [ 
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/', login_view, name='login'),
    path('register/', register_usuario, name='register'),
    path('', include(router.urls)),
]
