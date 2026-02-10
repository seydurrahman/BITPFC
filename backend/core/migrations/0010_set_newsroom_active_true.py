from django.db import migrations


def set_active(apps, schema_editor):
    NewsRoom = apps.get_model("core", "NewsRoom")
    NewsRoom.objects.filter(is_active=False).update(is_active=True)


def unset_active(apps, schema_editor):
    # reverse operation: set to False where previously False isn't tracked,
    # so we simply leave it as-is (no-op) to avoid unintended data loss
    pass


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0009_newsroom_created_at_newsroom_updated_at"),
    ]

    operations = [
        migrations.RunPython(set_active, unset_active),
    ]
