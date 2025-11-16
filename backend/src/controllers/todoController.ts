import { Response } from 'express';
import { TodoModel } from '../models/Todo';
import { AuthRequest } from '../middleware/auth';
import { logError } from '../utils/logger';
import { CreateTodoInput, UpdateTodoInput } from '../types/dto';

export const createTodo = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { text }: CreateTodoInput = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ message: 'Authentication required' });
      return;
    }

    const todo = await TodoModel.create({
      text,
      completed: false,
      userId,
    });

    res.status(201).json({
      message: 'Todo created successfully',
      todo,
    });
  } catch (error) {
    const err = error as Error;
    await logError('error', 'Create todo error', err, req.user?.userId, '/todos', 'POST');
    res.status(500).json({ message: 'Error creating todo', error: err.message });
  }
};

export const getTodos = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ message: 'Authentication required' });
      return;
    }

    const todos = await TodoModel.find({ userId }).sort({ createdAt: -1 });

    res.json({
      message: 'Todos retrieved successfully',
      todos,
    });
  } catch (error) {
    const err = error as Error;
    await logError('error', 'Get todos error', err, req.user?.userId, '/todos', 'GET');
    res.status(500).json({ message: 'Error retrieving todos', error: err.message });
  }
};

export const updateTodo = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { text }: UpdateTodoInput = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ message: 'Authentication required' });
      return;
    }

    const todo = await TodoModel.findOne({ _id: id, userId });
    if (!todo) {
      res.status(404).json({ message: 'Todo not found' });
      return;
    }

    todo.text = text;
    await todo.save();

    res.json({
      message: 'Todo updated successfully',
      todo,
    });
  } catch (error) {
    const err = error as Error;
    await logError('error', 'Update todo error', err, req.user?.userId, `/todos/${req.params.id}`, 'PUT');
    res.status(500).json({ message: 'Error updating todo', error: err.message });
  }
};

export const toggleTodo = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ message: 'Authentication required' });
      return;
    }

    const todo = await TodoModel.findOne({ _id: id, userId });
    if (!todo) {
      res.status(404).json({ message: 'Todo not found' });
      return;
    }

    todo.completed = !todo.completed;
    await todo.save();

    res.json({
      message: 'Todo toggled successfully',
      todo,
    });
  } catch (error) {
    const err = error as Error;
    await logError('error', 'Toggle todo error', err, req.user?.userId, `/todos/${req.params.id}/toggle`, 'PATCH');
    res.status(500).json({ message: 'Error toggling todo', error: err.message });
  }
};

export const deleteTodo = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ message: 'Authentication required' });
      return;
    }

    const todo = await TodoModel.findOneAndDelete({ _id: id, userId });
    if (!todo) {
      res.status(404).json({ message: 'Todo not found' });
      return;
    }

    res.json({
      message: 'Todo deleted successfully',
    });
  } catch (error) {
    const err = error as Error;
    await logError('error', 'Delete todo error', err, req.user?.userId, `/todos/${req.params.id}`, 'DELETE');
    res.status(500).json({ message: 'Error deleting todo', error: err.message });
  }
};

