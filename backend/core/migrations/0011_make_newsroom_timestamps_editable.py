from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0010_set_newsroom_active_true"),
    ]

    operations = [
        migrations.AlterField(
            model_name="newsroom",
            name="created_at",
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AlterField(
            model_name="newsroom",
            name="updated_at",
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
