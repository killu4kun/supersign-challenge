'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  registerSchema,
  type RegisterFormData,
} from '@/lib/schemas/auth-schema';
import { registerUser } from '@/lib/auth/actions';
import { useRouter } from 'next/navigation';

export function RegisterForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    const result = await registerUser(data);

    if (result?.error) {
      Object.entries(result.error).forEach(([key, value]) => {
        setError(key as keyof RegisterFormData, { message: value?.[0] });
      });
    }

    if (result?.success) {
      router.push('/login?registered=true');
    }
  });

  return (
    <form onSubmit={onSubmit} className='space-y-4'>
      <div>
        <label
          htmlFor='name'
          className='block text-sm font-medium text-slate-700 mb-1'
        >
          Nome
        </label>
        <input
          {...register('name')}
          type='text'
          className='w-full p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-700 placeholder-slate-400'
        />
        {errors.name && (
          <p className='text-red-600 text-sm mt-1'>{errors.name.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor='email'
          className='block text-sm font-medium text-slate-700 mb-1'
        >
          E-mail
        </label>
        <input
          {...register('email')}
          type='email'
          className='w-full p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-700 placeholder-slate-400'
        />
        {errors.email && (
          <p className='text-red-600 text-sm mt-1'>{errors.email.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor='password'
          className='block text-sm font-medium text-slate-700 mb-1'
        >
          Senha
        </label>
        <input
          {...register('password')}
          type='password'
          className='w-full p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-700 placeholder-slate-400'
        />
        {errors.password && (
          <p className='text-red-600 text-sm mt-1'>{errors.password.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor='confirmPassword'
          className='block text-sm font-medium text-slate-700 mb-1'
        >
          Confirmar Senha
        </label>
        <input
          {...register('confirmPassword')}
          type='password'
          className='w-full p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-700 placeholder-slate-400'
        />
        {errors.confirmPassword && (
          <p className='text-red-600 text-sm mt-1'>
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {errors.root?.message && (
        <p className='text-red-600 text-sm'>{errors.root.message}</p>
      )}

      <button
        type='submit'
        disabled={isSubmitting}
        className='w-full bg-slate-800 text-white p-2 rounded-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
      >
        {isSubmitting ? 'Criando conta...' : 'Criar Conta'}
      </button>
    </form>
  );
}
