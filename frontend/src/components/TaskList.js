import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [successMessage, setSuccessMessage] = useState(null);

  const loadTasks = async (status = null) => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.tasks.getAll(status);
      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const statusMap = {
      all: null,
      completed: 'completed',
      pending: 'pending',
    };
    loadTasks(statusMap[filter]);
  }, [filter]);

  const handleTaskCreated = (newTask) => {
    setTasks((prev) => [newTask, ...prev]);
    setSuccessMessage('Tarefa criada com sucesso!');
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setSuccessMessage('Tarefa atualizada com sucesso!');
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handleTaskDeleted = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
    setSuccessMessage('Tarefa deletada com sucesso!');
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const getTaskStats = () => {
    return {
      total: tasks.length,
      pending: tasks.filter((t) => t.status === 'pending').length,
      completed: tasks.filter((t) => t.status === 'completed').length,
    };
  };

  const stats = getTaskStats();

  return (
    <div className="task-manager">
      <div className="container">
        <header className="app-header">
          <h1>Gerenciador de Tarefas</h1>
          <p>Organize suas tarefas de forma simples e eficiente</p>
        </header>

        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}

        <div className="main-content">
          <aside className="sidebar">
            <TaskForm onTaskCreated={handleTaskCreated} />
          </aside>

          <main className="tasks-section">
            <div className="filter-section">
              <h2>Tarefas</h2>
              <div className="filters">
                <button
                  className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                  onClick={() => setFilter('all')}
                >
                  Todos {stats.total}
                </button>
                <button
                  className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
                  onClick={() => setFilter('pending')}
                >
                  Pendentes ({stats.pending})
                </button>
                <button
                  className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
                  onClick={() => setFilter('completed')}
                >
                  Concluídos ({stats.completed})
                </button>
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            {loading && <div className="loading-spinner">Carregando tarefas...</div>}

            {!loading && tasks.length === 0 && (
              <div className="empty-state">
                <p>
                  {filter === 'all'
                    ? 'Nenhuma tarefa encontrada. Crie uma nova!'
                    : `Nenhuma tarefa ${filter === 'pending' ? 'pendente' : 'concluída'}.`}
                </p>
              </div>
            )}

            {!loading && tasks.length > 0 && (
              <div className="tasks-list">
                {tasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onTaskUpdated={handleTaskUpdated}
                    onTaskDeleted={handleTaskDeleted}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default TaskList;
