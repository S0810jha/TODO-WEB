import { Response } from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { UserModel } from '../models/User';
import { AuthRequest } from '../middleware/auth';
import { logError } from '../utils/logger';
import {
  SignupInput,
  LoginInput,
  ForgotPasswordInput,
  ResetPasswordInput,
} from '../types/dto';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';

const generateToken = (userId: string, email: string): string => {
  return jwt.sign({ userId, email }, JWT_SECRET, { expiresIn: '7d' });
};

export const signup = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { email, password }: SignupInput = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'Email already registered' });
      return;
    }

    const user = await UserModel.create({ email, password });
    const token = generateToken(user._id.toString(), user.email);

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: { id: user._id, email: user.email },
    });
  } catch (error) {
    const err = error as Error;
    await logError('error', 'Signup error', err, undefined, '/auth/signup', 'POST');
    res.status(500).json({ message: 'Error creating user', error: err.message });
  }
};

export const login = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { email, password }: LoginInput = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    const token = generateToken(user._id.toString(), user.email);

    res.json({
      message: 'Login successful',
      token,
      user: { id: user._id, email: user.email },
    });
  } catch (error) {
    const err = error as Error;
    await logError('error', 'Login error', err, undefined, '/auth/login', 'POST');
    res.status(500).json({ message: 'Error during login', error: err.message });
  }
};

export const forgotPassword = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { email }: ForgotPasswordInput = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      // Don't reveal if user exists for security
      res.json({ message: 'If email exists, password reset link has been sent' });
      return;
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour
    await user.save();

    // In production, send email with reset link
    // For now, we'll return the token (in production, this should be sent via email)
    res.json({
      message: 'Password reset token generated',
      resetToken, // Remove this in production, send via email instead
    });
  } catch (error) {
    const err = error as Error;
    await logError('error', 'Forgot password error', err, undefined, '/auth/forgot-password', 'POST');
    res.status(500).json({ message: 'Error processing request', error: err.message });
  }
};

export const resetPassword = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { token, password }: ResetPasswordInput = req.body;

    const user = await UserModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() },
    });

    if (!user) {
      res.status(400).json({ message: 'Invalid or expired reset token' });
      return;
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    const err = error as Error;
    await logError('error', 'Reset password error', err, undefined, '/auth/reset-password', 'POST');
    res.status(500).json({ message: 'Error resetting password', error: err.message });
  }
};

