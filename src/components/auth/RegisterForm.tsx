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
        <label htmlFor='name' className='block mb-1'>
          Nome
        </label>
        <input
          {...register('name')}
          type='text'
          className='w-full p-2 border rounded'
        />
        {errors.name && (
          <p className='text-red-500 text-sm'>{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor='email' className='block mb-1'>
          E-mail
        </label>
        <input
          {...register('email')}
          type='email'
          className='w-full p-2 border rounded'
        />
        {errors.email && (
          <p className='text-red-500 text-sm'>{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor='password' className='block mb-1'>
          Senha
        </label>
        <input
          {...register('password')}
          type='password'
          className='w-full p-2 border rounded'
        />
        {errors.password && (
          <p className='text-red-500 text-sm'>{errors.password.message}</p>
        )}
      </div>

      <div>
        <label htmlFor='confirmPassword' className='block mb-1'>
          Confirmar Senha
        </label>
        <input
          {...register('confirmPassword')}
          type='password'
          className='w-full p-2 border rounded'
        />
        {errors.confirmPassword && (
          <p className='text-red-500 text-sm'>
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {errors.root?.message && (
        <p className='text-red-500 text-sm'>{errors.root.message}</p>
      )}

      <button
        type='submit'
        disabled={isSubmitting}
        className='w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50'
      >
        {isSubmitting ? 'Criando conta...' : 'Registrar'}
      </button>
    </form>
  );
}
