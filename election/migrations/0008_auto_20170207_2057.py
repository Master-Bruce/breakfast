# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-02-07 20:57
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('election', '0007_auto_20170207_2056'),
    ]

    operations = [
        migrations.AlterField(
            model_name='candidate',
            name='img',
            field=models.FileField(blank=True, default='static/images/placeholder.png', null=True, upload_to='uploads/'),
        ),
    ]