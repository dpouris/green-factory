from django.db import models

class Material(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    mean = models.JSONField()

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name
