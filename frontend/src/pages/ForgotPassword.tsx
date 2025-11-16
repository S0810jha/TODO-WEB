import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { forgotPasswordSchema, ForgotPasswordInput } from '../lib/schemas';
import { authService } from '../services/authService';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';

export const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const mutation = useMutation({
    mutationFn: authService.forgotPassword,
  });

  const onSubmit = (data: ForgotPasswordInput) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Forgot Password</h1>
        {mutation.isSuccess ? (
          <div className="space-y-4">
            <p className="text-green-600">
              If the email exists, a password reset link has been sent. Please check your email.
            </p>
            <p className="text-sm text-gray-600">
              Note: In development, the reset token is returned in the response. Check the console or network tab.
            </p>
            <Link to="/login">
              <Button className="w-full">Back to Login</Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Email"
              type="email"
              {...register('email')}
              error={errors.email?.message}
            />
            {mutation.error && (
              <p className="text-sm text-red-600">
                {(mutation.error as any)?.response?.data?.message || 'An error occurred'}
              </p>
            )}
            <Button type="submit" isLoading={mutation.isPending} className="w-full">
              Send Reset Link
            </Button>
            <Link to="/login">
              <Button variant="secondary" className="w-full">
                Back to Login
              </Button>
            </Link>
          </form>
        )}
      </Card>
    </div>
  );
};

