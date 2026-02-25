import React, { useState } from 'react';
import { api } from '../services/api';

function TaskItem({ task, onTaskUpdated, onTaskDeleted }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleMarkAsDone = async () => {
    setError(null);
    setLoading(true);
    try {
      const updated = await api.tasks.markAsDone(task.id);
      onTaskUpdated({ ...task, status: 'completed' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Tem certeza que deseja deletar esta tarefa?')) {
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await api.tasks.delete(task.id);
      onTaskDeleted(task.id);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusLabel = (status) => {
    const labels = {
      pending: 'Pendente',
      completed: 'Concluída',
    };
    return labels[status] || status;
  };

  const getStatusClass = (status) => {
    return `status-${status}`;
  };

  const getCategoryLabel = (category) => {
    const labels = {
      urgent: 'Urgente',
      important: 'Importante',
      later: 'Mais Tarde',
    };
    return labels[category] || category;
  };

  return (
    <div className={`task-item ${getStatusClass(task.status)}`}>
      {error && <div className="error-message">{error}</div>}
      
      <div className="task-content">
        <div className="task-header">
          <h3>{task.title}</h3>
          <span className={`status-badge ${task.status}`}>
            {getStatusLabel(task.status)}
          </span>
          <span className={`category-badge ${task.category}`}>
            {getCategoryLabel(task.category)}
          </span>
        </div>

        {task.description && (
          <p className="task-description">{task.description}</p>
        )}

        <div className="task-meta">
        {task.created_at && (
          <span className="date">
            <svg
              className="icon icon-clock"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
              <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
            </svg>
            {' '}
            {new Date(task.created_at).toLocaleDateString('pt-BR')}
          </span>
        )}

        {task.deadline && (
          <span className="date">
            <svg
              className="icon icon-calendar-check"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
            </svg>
            {' '}
            {new Date(task.deadline).toLocaleDateString('pt-BR')}
          </span>
        )}
      </div>
      </div>

      <div className="task-actions">
        {task.status !== 'completed' && (
          <button
            onClick={handleMarkAsDone}
            disabled={loading}
            className="btn-done"
            title="Marcar como concluída"
          >
            <svg
              className="icon icon-check"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M9 16.2L4.8 12l-1.4 1.4L9 19l12-12-1.4-1.4z" />
            </svg>
          </button>
        )}
        <button
          onClick={handleDelete}
          disabled={loading}
          className="btn-delete"
          title="Deletar tarefa"
        >
          <svg
            className="icon icon-trash"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
