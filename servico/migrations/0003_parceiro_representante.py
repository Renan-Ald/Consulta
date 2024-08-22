# Generated by Django 3.2.25 on 2024-08-22 02:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('servico', '0002_customuser_nivel_acesso'),
    ]

    operations = [
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
                ('id_pessoa', models.IntegerField()),
                ('id_endereco', models.IntegerField()),
                ('created_by', models.IntegerField()),
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
    ]
