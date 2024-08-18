from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('O email deve ser fornecido')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    NIVEL_ACESSO_CHOICES = [
        ('administrador', 'Administrador'),
        ('funcionario', 'Funcionário'),
        ('cliente', 'Cliente'),
    ]

    email = models.EmailField(unique=True)
    nome_completo = models.CharField(max_length=255)
    cep = models.CharField(max_length=10)
    telefone = models.CharField(max_length=20)
    endereco = models.CharField(max_length=255)
    cpf = models.CharField(max_length=14, unique=True)
    funcionario = models.CharField(max_length=30)
    is_staff = models.BooleanField(default=False)
    nivel_acesso = models.CharField(max_length=20, choices=NIVEL_ACESSO_CHOICES, default='cliente')

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nome_completo', 'cep', 'telefone', 'endereco', 'cpf']

    def __str__(self):
        return self.email

    class Meta:
        permissions = [
            ("can_view", "Can view content"),
        ]

    groups = models.ManyToManyField(
        'auth.Group',
        related_name='customuser_set',  # Nome diferente para evitar conflitos
        blank=True,
    )

    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='customuser_set',  # Nome diferente para evitar conflitos
        blank=True,
    )