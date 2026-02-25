import React, { useState } from 'react';
import { api } from '../services/api';

function TaskForm({ onTaskCreated }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    deadline: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.title.trim()) {
      setError('Por favor, preencha o título da tarefa.');
      return;
    }

    if (!formData.description.trim()) {
      setError('Por favor, preencha a descrição da tarefa.');
      return;
    }

    if (!formData.category) {
      setError('Por favor, selecione uma categoria.');
      return;
    }

    if (!formData.deadline) {
      setError('Por favor, preencha o prazo da tarefa.');
      return;
    }

    setLoading(true);
    try {
      const newTask = await api.tasks.create(formData);
      setFormData({ title: '', description: '', category: '', deadline: '' });
      onTaskCreated(newTask);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h2>Nova Tarefa</h2>
      <p className="form-note">Preencha todos os campos</p>
      {error && <div className="error-message">{error}</div>}
      
      <div className="form-group">
        <label htmlFor="title">Título *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Digite o título da tarefa"
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Descrição *</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Digite a descrição"
          style={{ resize: 'none' }}
          rows="3"
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Categoria *</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          disabled={loading}
        >
          <option value="">Selecione uma categoria</option>
          <option value="urgent">Urgente</option>
          <option value="important">Importante</option>
          <option value="later">Mais Tarde</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="deadline">Prazo *</label>
        <input
          type="datetime-local"
          id="deadline"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          disabled={loading}
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Criando...' : 'Criar Tarefa'}
      </button>
    </form>
  );
}

export default TaskForm;
