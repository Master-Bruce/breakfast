# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-02-11 22:03
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('election', '0012_subelection_visible'),
    ]

    operations = [
        migrations.AlterField(
            model_name='candidate',
            name='img',
            field=models.FileField(blank=True, default='/Users/private/PycharmProjects/breakfast/election/static/images/placeholder.png', null=True, upload_to='uploads/'),
        ),
    ]
