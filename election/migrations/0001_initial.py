# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-09-05 02:22
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Ballot',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='Candidate',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=250)),
            ],
        ),
        migrations.CreateModel(
            name='Election',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=128)),
                ('active', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='ElectionUser',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('election', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='election.Election')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=128)),
                ('file', models.FileField(upload_to='uploads/')),
            ],
        ),
        migrations.CreateModel(
            name='SubElection',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('short', models.CharField(default='', max_length=10)),
                ('election', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='election.Election')),
            ],
        ),
        migrations.AddField(
            model_name='candidate',
            name='image',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='election.Image'),
        ),
        migrations.AddField(
            model_name='candidate',
            name='sub_election',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='election.SubElection'),
        ),
        migrations.AddField(
            model_name='ballot',
            name='choice',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='election.Candidate'),
        ),
        migrations.AddField(
            model_name='ballot',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='election.ElectionUser'),
        ),
    ]
