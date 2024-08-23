# Generated by Django 3.2.25 on 2024-08-23 14:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('servico', '0002_customuser_nivel_acesso'),
    ]

    operations = [
        migrations.CreateModel(
            name='Agendamento',
            fields=[
                ('id_agendamento', models.AutoField(primary_key=True, serialize=False)),
                ('codigo', models.CharField(max_length=50)),
                ('status', models.CharField(default='pendente', max_length=20)),
                ('representante_pago', models.BooleanField(default=False)),
                ('data_realizacao', models.DateTimeField()),
                ('data_modificacao', models.DateTimeField(auto_now=True)),
                ('data_criacao', models.DateTimeField(auto_now_add=True)),
                ('id_cliente', models.IntegerField(default=0)),
                ('id_parceiro', models.IntegerField(default=0)),
                ('id_financeiro', models.IntegerField(default=0)),
                ('id_agendamento_pagamento', models.IntegerField(blank=True, null=True)),
                ('id_representante', models.IntegerField(default=0)),
                ('id_representante_pagamento', models.IntegerField(blank=True, null=True)),
                ('created_by', models.IntegerField(default=0)),
                ('modified_by', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Especialidade',
            fields=[
                ('codigo_especialidade', models.CharField(max_length=10, primary_key=True, serialize=False)),
                ('nome', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Parceiro',
            fields=[
                ('id_parceiro', models.AutoField(primary_key=True, serialize=False)),
                ('nome', models.CharField(max_length=255)),
                ('banco', models.CharField(max_length=255)),
                ('agencia', models.CharField(max_length=20)),
                ('conta', models.CharField(max_length=20)),
                ('telefone', models.CharField(max_length=15)),
                ('horario_funcionamento', models.CharField(max_length=100)),
                ('ciclo_pagamento', models.CharField(max_length=100)),
                ('data_fechamento_ciclo', models.DateField()),
                ('status', models.BooleanField(default=True)),
                ('data_criacao', models.DateTimeField(auto_now_add=True)),
                ('data_modificacao', models.DateTimeField(auto_now=True)),
                ('id_endereco', models.IntegerField()),
                ('created_by', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Pessoa',
            fields=[
                ('id_pessoa', models.AutoField(primary_key=True, serialize=False)),
                ('pessoa_juridica', models.BooleanField()),
            ],
        ),
        migrations.CreateModel(
            name='Representante',
            fields=[
                ('id_representante', models.AutoField(primary_key=True, serialize=False)),
                ('nome', models.CharField(max_length=255)),
                ('cpf', models.CharField(max_length=14)),
                ('telefones', models.CharField(max_length=50)),
                ('banco', models.CharField(max_length=255)),
                ('agencia', models.CharField(max_length=20)),
                ('conta', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Tuss',
            fields=[
                ('codigo_tuss', models.CharField(max_length=10, primary_key=True, serialize=False)),
                ('nome', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='PessoaJuridica',
            fields=[
                ('id_pessoa_juridica', models.AutoField(primary_key=True, serialize=False)),
                ('razao_social', models.CharField(max_length=255)),
                ('nome_fantasia', models.CharField(blank=True, max_length=255, null=True)),
                ('cnpj', models.CharField(max_length=18)),
                ('telefone', models.CharField(max_length=15)),
                ('telefone2', models.CharField(blank=True, max_length=15, null=True)),
                ('email', models.EmailField(blank=True, max_length=255, null=True)),
                ('nome_responsavel', models.CharField(blank=True, max_length=255, null=True)),
                ('cpf_responsavel', models.CharField(blank=True, max_length=14, null=True)),
                ('telefone_responsavel', models.CharField(blank=True, max_length=15, null=True)),
                ('email_responsavel', models.EmailField(blank=True, max_length=255, null=True)),
                ('data_criacao', models.DateTimeField(auto_now_add=True)),
                ('data_modificacao', models.DateTimeField(auto_now=True)),
                ('id_pessoa', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='servico.pessoa')),
            ],
        ),
        migrations.CreateModel(
            name='PessoaFisica',
            fields=[
                ('id_pessoa_fisica', models.AutoField(primary_key=True, serialize=False)),
                ('nome', models.CharField(max_length=255)),
                ('nome_social', models.CharField(blank=True, max_length=255, null=True)),
                ('sexo', models.CharField(max_length=1)),
                ('data_nascimento', models.DateField()),
                ('cpf', models.CharField(max_length=14)),
                ('rg', models.CharField(max_length=20)),
                ('telefone', models.CharField(max_length=15)),
                ('telefone2', models.CharField(blank=True, max_length=15, null=True)),
                ('email', models.EmailField(blank=True, max_length=255, null=True)),
                ('pai', models.CharField(blank=True, max_length=255, null=True)),
                ('mae', models.CharField(blank=True, max_length=255, null=True)),
                ('responsavel', models.CharField(blank=True, max_length=255, null=True)),
                ('data_criacao', models.DateTimeField(auto_now_add=True)),
                ('data_modificacao', models.DateTimeField(auto_now=True)),
                ('id_pessoa', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='servico.pessoa')),
            ],
        ),
    ]
