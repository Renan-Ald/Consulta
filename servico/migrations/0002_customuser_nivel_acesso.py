# Generated by Django 3.2.25 on 2024-08-17 11:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('servico', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='nivel_acesso',
            field=models.CharField(choices=[('administrador', 'Administrador'), ('funcionario', 'Funcionário'), ('cliente', 'Cliente')], default='cliente', max_length=20),
        ),
    ]
