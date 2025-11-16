import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { resetPasswordSchema, ResetPasswordInput } from '../lib/schemas';
import { authService } from '../services/authService';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';

export const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: ResetPasswordInput) =>
      authService.resetPassword({ ...data, token: token || '' }),
    onSuccess: () => {
      navigate('/login');
    },
  });

  const onSubmit = (data: ResetPasswordInput) => {
    if (!token) {
      return;
    }
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Reset Password</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="New Password"
            type="password"
            {...register('password')}
            error={errors.password?.message}
          />
          <Input
            label="Confirm Password"
            type="password"
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
          />
          {mutation.error && (
            <p className="text-sm text-red-600">
              {(mutation.error as any)?.response?.data?.message || 'An error occurred'}
            </p>
          )}
          <Button type="submit" isLoading={mutation.isPending} className="w-full">
            Reset Password
          </Button>
        </form>
      </Card>
    </div>
  );
};

