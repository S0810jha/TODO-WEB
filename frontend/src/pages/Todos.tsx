import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { todoSchema, TodoInput } from '../lib/schemas';
import { todoService, Todo } from '../services/todoService';
import { useAuthStore } from '../store/authStore';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { Modal } from '../components/Modal';

export const Todos = () => {
  const navigate = useNavigate();
  const { user, clearAuth } = useAuthStore();
  const queryClient = useQueryClient();
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [editText, setEditText] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TodoInput>({
    resolver: zodResolver(todoSchema),
  });

  const { data: todos = [], isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: todoService.getTodos,
  });

  const createMutation = useMutation({
    mutationFn: todoService.createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      reset();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: TodoInput }) =>
      todoService.updateTodo(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setEditingTodo(null);
      setEditText('');
    },
  });

  const toggleMutation = useMutation({
    mutationFn: todoService.toggleTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: todoService.deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const onSubmit = (data: TodoInput) => {
    createMutation.mutate(data);
  };

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setEditText(todo.text);
  };

  const handleUpdate = () => {
    if (editingTodo && editText.trim()) {
      updateMutation.mutate({ id: editingTodo._id, data: { text: editText } });
    }
  };

  const handleLogout = () => {
    clearAuth();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Todos</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Welcome, {user?.email}</span>
            <Button variant="secondary" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>

        <Card className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Add New Todo</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
            <Input
              placeholder="Enter todo text..."
              {...register('text')}
              error={errors.text?.message}
              className="flex-1"
            />
            <Button type="submit" isLoading={createMutation.isPending}>
              Add Todo
            </Button>
          </form>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-4">Your Todos</h2>
          {isLoading ? (
            <p className="text-gray-500">Loading todos...</p>
          ) : todos.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No todos yet. Create your first todo!</p>
          ) : (
            <div className="space-y-2">
              {todos.map((todo) => (
                <div
                  key={todo._id}
                  className={`flex items-center gap-3 p-4 border rounded-lg ${
                    todo.completed ? 'bg-gray-50 opacity-75' : 'bg-white'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleMutation.mutate(todo._id)}
                    className="w-5 h-5 cursor-pointer"
                  />
                  <span
                    className={`flex-1 ${
                      todo.completed ? 'line-through text-gray-500' : 'text-gray-900'
                    }`}
                  >
                    {todo.text}
                  </span>
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      onClick={() => handleEdit(todo)}
                      disabled={todo.completed}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => deleteMutation.mutate(todo._id)}
                      isLoading={deleteMutation.isPending}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Modal
          isOpen={!!editingTodo}
          onClose={() => {
            setEditingTodo(null);
            setEditText('');
          }}
          title="Edit Todo"
        >
          <div className="space-y-4">
            <Input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              placeholder="Enter todo text..."
            />
            <div className="flex gap-2">
              <Button
                onClick={handleUpdate}
                isLoading={updateMutation.isPending}
                className="flex-1"
              >
                Update
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setEditingTodo(null);
                  setEditText('');
                }}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

