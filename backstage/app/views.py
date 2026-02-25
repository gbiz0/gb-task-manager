from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Task
from .serializers import TaskSerializer

class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer

    #filter by status
    def get_queryset(self):
        queryset = Task.objects.all()
        status_filter = self.request.query_params.get('status')
        
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        return queryset

    @action(detail=True, methods=['patch'])
    def done(self, request, pk=None):
        task = self.get_object()
        task.status = 'completed'
        task.save()
        return Response({'status': 'Tarefa finalizada com sucesso!'}, status=status.HTTP_200_OK)