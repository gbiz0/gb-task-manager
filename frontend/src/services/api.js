const API_BASE_URL = 'http://localhost:8000/api';

export const api = {
  tasks: {
    getAll: async (status = null) => {
      try {
        let url = `${API_BASE_URL}/tasks/`;
        if (status) {
          url += `?status=${status}`;
        }
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        throw new Error(`Erro ao listar tarefas: ${error.message}`);
      }
    },

    create: async (data) => {
      try {
        const response = await fetch(`${API_BASE_URL}/tasks/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        throw new Error(`Erro ao criar tarefa: ${error.message}`);
      }
    },

    markAsDone: async (id) => {
      try {
        const response = await fetch(`${API_BASE_URL}/tasks/${id}/done/`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        throw new Error(`Erro ao marcar tarefa como concluída: ${error.message}`);
      }
    },

    delete: async (id) => {
      try {
        const response = await fetch(`${API_BASE_URL}/tasks/${id}/`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        return response.status === 204 || await response.json();
      } catch (error) {
        throw new Error(`Erro ao deletar tarefa: ${error.message}`);
      }
    },
  },
};
