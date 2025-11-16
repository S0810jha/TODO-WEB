import { Router } from 'express';
import {
  createTodo,
  getTodos,
  updateTodo,
  toggleTodo,
  deleteTodo,
} from '../controllers/todoController';
import { authenticate } from '../middleware/auth';
import { CreateTodoDTO, UpdateTodoDTO } from '../types/dto';

const router = Router();

const validate = (schema: any) => {
  return (req: any, res: any, next: any) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: any) {
      res.status(400).json({
        message: 'Validation error',
        errors: error.errors,
      });
    }
  };
};

router.use(authenticate);

router.post('/', validate(CreateTodoDTO), createTodo);
router.get('/', getTodos);
router.put('/:id', validate(UpdateTodoDTO), updateTodo);
router.patch('/:id/toggle', toggleTodo);
router.delete('/:id', deleteTodo);

export default router;

