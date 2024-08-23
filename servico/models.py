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
class Pessoa(models.Model):
    id_pessoa = models.AutoField(primary_key=True)
    pessoa_juridica = models.BooleanField()  # Se 'pessoa_juridica' for um booleano, representando pessoa física ou jurídica

    def __str__(self):
        return f"{self.id_pessoa} - {'Jurídica' if self.pessoa_juridica else 'Física'}"
class PessoaFisica(models.Model):
    id_pessoa_fisica = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=255)
    nome_social = models.CharField(max_length=255, blank=True, null=True)
    sexo = models.CharField(max_length=1)  # Pode ser "M", "F", ou outras representações
    data_nascimento = models.DateField()
    cpf = models.CharField(max_length=14)  # Formato: 000.000.000-00
    rg = models.CharField(max_length=20)
    telefone = models.CharField(max_length=15)  # Formato: (xx) xxxxx-xxxx
    telefone2 = models.CharField(max_length=15, blank=True, null=True)  # Telefone secundário opcional
    email = models.EmailField(max_length=255, blank=True, null=True)
    pai = models.CharField(max_length=255, blank=True, null=True)
    mae = models.CharField(max_length=255, blank=True, null=True)
    responsavel = models.CharField(max_length=255, blank=True, null=True)
    data_criacao = models.DateTimeField(auto_now_add=True)
    data_modificacao = models.DateTimeField(auto_now=True)
    id_pessoa = models.ForeignKey('Pessoa', on_delete=models.CASCADE)  # Relacionamento com o modelo Pessoa

    def __str__(self):
        return self.nome
from django.db import models

class PessoaJuridica(models.Model):
    id_pessoa_juridica = models.AutoField(primary_key=True)
    razao_social = models.CharField(max_length=255)
    nome_fantasia = models.CharField(max_length=255, blank=True, null=True)
    cnpj = models.CharField(max_length=18)  # Formato: 00.000.000/0000-00
    telefone = models.CharField(max_length=15)  # Formato: (xx) xxxxx-xxxx
    telefone2 = models.CharField(max_length=15, blank=True, null=True)  # Telefone secundário opcional
    email = models.EmailField(max_length=255, blank=True, null=True)
    nome_responsavel = models.CharField(max_length=255, blank=True, null=True)
    cpf_responsavel = models.CharField(max_length=14, blank=True, null=True)  # Formato: 000.000.000-00
    telefone_responsavel = models.CharField(max_length=15, blank=True, null=True)  # Telefone do responsável
    email_responsavel = models.EmailField(max_length=255, blank=True, null=True)
    data_criacao = models.DateTimeField(auto_now_add=True)
    data_modificacao = models.DateTimeField(auto_now=True)
    id_pessoa = models.ForeignKey(Pessoa, on_delete=models.CASCADE)  # Relacionamento com o modelo Pessoa

    def __str__(self):
        return self.razao_social

class Parceiro(models.Model):
    id_parceiro = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=255)
    banco = models.CharField(max_length=255)
    agencia = models.CharField(max_length=20)
    conta = models.CharField(max_length=20)
    telefone = models.CharField(max_length=15)
    horario_funcionamento = models.CharField(max_length=100)
    ciclo_pagamento = models.CharField(max_length=100)
    data_fechamento_ciclo = models.DateField()
    status = models.BooleanField(default=True)
    data_criacao = models.DateTimeField(auto_now_add=True)
    data_modificacao = models.DateTimeField(auto_now=True)
    # pessoa = models.ForeignKey(Pessoa, on_delete=models.CASCADE)  # Relacionamento com o modelo Pessoa
    id_endereco = models.IntegerField()
    created_by = models.IntegerField()

    def __str__(self):
        return self.nome

class Representante(models.Model):
    id_representante = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=255)
    cpf = models.CharField(max_length=14)  # Formato: 000.000.000-00
    telefones = models.CharField(max_length=50)  # Formato: (xx) xxxxx-xxxx
    banco = models.CharField(max_length=255)
    agencia = models.CharField(max_length=20)
    conta = models.CharField(max_length=20)

    def __str__(self):
        return self.nome
class Tuss(models.Model):
    codigo_tuss = models.CharField(max_length=10, primary_key=True)  # O campo de código TUSS como chave primária
    nome = models.CharField(max_length=255)  # Nome associado ao código TUSS

    def __str__(self):
        return f"{self.codigo_tuss} - {self.nome}"
    
class Tuss(models.Model):
    codigo_tuss = models.CharField(max_length=10, primary_key=True)  # O campo de código TUSS como chave primária
    nome = models.CharField(max_length=255)  # Nome associado ao código TUSS

    def __str__(self):
        return f"{self.codigo_tuss} - {self.nome}"
class Especialidade(models.Model):
    codigo_especialidade = models.CharField(max_length=10, primary_key=True)  # Código da especialidade como chave primária
    nome = models.CharField(max_length=255)  # Nome da especialidade

    def __str__(self):
        return f"{self.codigo_especialidade} - {self.nome}"

class Agendamento(models.Model):
    id_agendamento = models.AutoField(primary_key=True)
    codigo = models.CharField(max_length=50)  # Código do agendamento
    status = models.CharField(max_length=20, default='pendente')  # Valor padrão
    representante_pago = models.BooleanField(default=False)  # Indica se o representante foi pago
    data_realizacao = models.DateTimeField()  # Data e hora de realização do agendamento
    data_modificacao = models.DateTimeField(auto_now=True)  # Data e hora da última modificação
    data_criacao = models.DateTimeField(auto_now_add=True)  # Data e hora da criação do agendamento
    id_cliente = models.IntegerField(default=0)  # ID do cliente associado
    id_parceiro = models.IntegerField(default=0)  # ID do parceiro associado
    id_financeiro = models.IntegerField(default=0)  # ID financeiro associado
    id_agendamento_pagamento = models.IntegerField(null=True, blank=True)  # ID do pagamento do agendamento
    id_representante = models.IntegerField(default=0)  # ID do representante associado
    id_representante_pagamento = models.IntegerField(null=True, blank=True)  # ID do pagamento do representante
    created_by = models.IntegerField(default=0)  # ID do usuário que criou o agendamento
    modified_by = models.IntegerField(default=0)  # ID do usuário que modificou o agendamento

    def __str__(self):
        return f'Agendamento {self.codigo} - {self.status}'
