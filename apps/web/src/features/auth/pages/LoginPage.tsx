import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore, authService } from '@agriconnect/services';
import { Button, Input, PasswordInput } from '@agriconnect/ui';
import { AuthLayout } from '../../../layouts/AuthLayout';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginPage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setSession } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await authService.login(data.email, data.password);
      
      setSession({
        user: response.user,
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        sessionExpiry: response.expiresAt,
        isAuthenticated: true,
      });
      
      const role = response.user.role;
      if (role === 'admin' || role === 'super_admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Welcome Back" 
      subtitle="Sign in to your AgriConnect account to manage your farm or trade crops."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {error && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg text-sm text-center font-medium animate-in fade-in zoom-in duration-300">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="name@example.com"
            error={errors.email?.message}
            {...register('email')}
          />

          <div className="space-y-1">
             <PasswordInput
               label="Password"
               placeholder="Enter your password"
               error={errors.password?.message}
               {...register('password')}
             />
             <div className="flex justify-end">
               <Link to="/forgot-password" title="Recover account" className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors">
                 Forgot Password?
               </Link>
             </div>
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full text-md font-bold py-6 rounded-xl shadow-lg ring-primary/25 hover:ring-4 transition-all" 
          size="lg"
          isLoading={isLoading}
        >
          Sign In
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border/50" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <Button variant="secondary" className="w-full" type="button" onClick={() => navigate('/login-phone')}>
             Phone OTP Login
          </Button>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link to="/signup" className="font-bold text-primary hover:text-primary/80 transition-colors">
            Sign Up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};
