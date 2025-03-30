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
      router.push('/?registered=true');
    }
  });

  return (
    <form onSubmit={onSubmit} className='mt-8 space-y-6'>
      <div className='space-y-4'>
        <div>
          <label
            htmlFor='name'
            className='block text-sm font-medium text-slate-700'
          >
            Nome
          </label>
          <input
            {...register('name')}
            type='text'
            id='name'
            autoComplete='name'
            required
            className='mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-700 placeholder-slate-400'
          />
          {errors.name && (
            <p className='mt-1 text-sm text-red-600'>{errors.name.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-slate-700'
          >
            E-mail
          </label>
          <input
            {...register('email')}
            type='email'
            id='email'
            autoComplete='email'
            required
            className='mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-700 placeholder-slate-400'
          />
          {errors.email && (
            <p className='mt-1 text-sm text-red-600'>{errors.email.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor='password'
            className='block text-sm font-medium text-slate-700'
          >
            Senha
          </label>
          <input
            {...register('password')}
            type='password'
            id='password'
            autoComplete='new-password'
            required
            className='mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-700 placeholder-slate-400'
          />
          {errors.password && (
            <p className='mt-1 text-sm text-red-600'>
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor='confirmPassword'
            className='block text-sm font-medium text-slate-700'
          >
            Confirmar Senha
          </label>
          <input
            {...register('confirmPassword')}
            type='password'
            id='confirmPassword'
            autoComplete='new-password'
            required
            className='mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-700 placeholder-slate-400'
          />
          {errors.confirmPassword && (
            <p className='mt-1 text-sm text-red-600'>
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
      </div>

      {errors.root?.message && (
        <div className='p-4 bg-red-50 text-red-700 rounded-lg border border-red-200'>
          {errors.root.message}
        </div>
      )}

      <button
        type='submit'
        disabled={isSubmitting}
        className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-slate-800 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
      >
        {isSubmitting ? 'Criando conta...' : 'Criar Conta'}
      </button>
    </form>
  );
}
