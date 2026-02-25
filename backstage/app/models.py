from django.db import models

class Task(models.Model):
    status_choices = [
        ('pending', 'Pendente'),
        ('completed', 'Concluída'),
    ]
    
    category_choices = [
        ('urgent', 'Urgente'),
        ('important', 'Importante'),
        ('later', 'Mais Tarde'),
    ]
    
    title = models.CharField(max_length=255)
    description = models.TextField()
    category = models.CharField(max_length=20, choices=category_choices, default='later')
    status = models.CharField(max_length=20, choices=status_choices, default='pending')
    deadline = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
