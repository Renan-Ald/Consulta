from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import login_view, register_usuario, UserViewSet,CustomTokenObtainPairView

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')

urlpatterns = [
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/', login_view, name='login'),
    path('register/', register_usuario, name='register'),
    path('', include(router.urls)),
]
