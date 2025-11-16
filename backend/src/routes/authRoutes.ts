import { Router } from 'express';
import { signup, login, forgotPassword, resetPassword } from '../controllers/authController';
import { authenticate } from '../middleware/auth';
import {
  SignupDTO,
  LoginDTO,
  ForgotPasswordDTO,
  ResetPasswordDTO,
} from '../types/dto';

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

router.post('/signup', validate(SignupDTO), signup);
router.post('/login', validate(LoginDTO), login);
router.post('/forgot-password', validate(ForgotPasswordDTO), forgotPassword);
router.post('/reset-password', validate(ResetPasswordDTO), resetPassword);

export default router;

