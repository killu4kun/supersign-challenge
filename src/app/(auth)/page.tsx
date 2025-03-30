'use client';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';
import { GithubButton } from '@/components/auth/GihubButton';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    });

    if (result?.error) {
      setError(result.error);
      return;
    }

    if (result?.ok) {
      router.push('/dashboard');
    }
  };

  return (
    <div className='min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg'>
        <div>
          <h1 className='text-3xl font-bold text-center text-slate-800'>
            Login
          </h1>
          <p className='mt-2 text-center text-sm text-slate-600'>
            Entre com sua conta para continuar
          </p>
        </div>

        {error && (
          <div className='p-4 bg-red-50 text-red-700 rounded-lg border border-red-200'>
            {error}
          </div>
        )}

        {searchParams.get('registered') && (
          <div className='p-4 bg-green-50 text-green-700 rounded-lg border border-green-200'>
            Conta criada com sucesso! Faça login para continuar.
          </div>
        )}

        <form onSubmit={handleSubmit} className='mt-8 space-y-6'>
          <div className='space-y-4'>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-slate-700'
              >
                Email
              </label>
              <input
                id='email'
                name='email'
                type='email'
                autoComplete='email'
                required
                placeholder='Digite seu email'
                className='mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-700 placeholder-slate-400'
              />
            </div>
            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-slate-700'
              >
                Senha
              </label>
              <input
                id='password'
                name='password'
                type='password'
                autoComplete='current-password'
                required
                placeholder='Digite sua senha'
                className='mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-700 placeholder-slate-400'
              />
            </div>
          </div>

          <button
            type='submit'
            className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-slate-800 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors duration-200'
          >
            Entrar
          </button>
        </form>

        <div className='mt-6'>
          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-slate-200'></div>
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='px-2 bg-white text-slate-500'>
                Ou continue com
              </span>
            </div>
          </div>

          <div className='mt-6 grid grid-cols-2 gap-3'>
            <GithubButton />
          </div>
        </div>

        <div className='text-center'>
          <p className='text-sm text-slate-600'>
            Não tem uma conta?{' '}
            <Link
              href='/register'
              className='font-medium text-indigo-600 hover:text-indigo-500'
            >
              Registre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <LoginForm />
    </Suspense>
  );
}
