import api from '../lib/api';
import { TodoInput } from '../lib/schemas';

export interface Todo {
  _id: string;
  text: string;
  completed: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export const todoService = {
  getTodos: async (): Promise<Todo[]> => {
    const response = await api.get('/todos');
    return response.data.todos;
  },

  createTodo: async (data: TodoInput) => {
    const response = await api.post('/todos', data);
    return response.data.todo;
  },

  updateTodo: async (id: string, data: TodoInput) => {
    const response = await api.put(`/todos/${id}`, data);
    return response.data.todo;
  },

  toggleTodo: async (id: string) => {
    const response = await api.patch(`/todos/${id}/toggle`);
    return response.data.todo;
  },

  deleteTodo: async (id: string) => {
    await api.delete(`/todos/${id}`);
  },
};

