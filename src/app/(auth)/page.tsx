'use client';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { GithubButton } from '@/components/auth/GihubButton';

export default function LoginPage() {
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
    <div className='max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md'>
      <h1 className='text-2xl font-bold mb-4 text-slate-800'>Login</h1>

      {error && (
        <div className='mb-4 p-3 bg-red-50 text-red-700 rounded-md border border-red-200'>
          {error}
        </div>
      )}

      {searchParams.get('registered') && (
        <div className='mb-4 p-3 bg-green-50 text-green-700 rounded-md border border-green-200'>
          Conta criada com sucesso! Faça login para continuar.
        </div>
      )}

      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-slate-700 mb-1'
          >
            Email
          </label>
          <input
            id='email'
            name='email'
            type='email'
            placeholder='Digite seu email'
            className='w-full p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-700 placeholder-slate-400'
            required
          />
        </div>
        <div>
          <label
            htmlFor='password'
            className='block text-sm font-medium text-slate-700 mb-1'
          >
            Senha
          </label>
          <input
            id='password'
            name='password'
            type='password'
            placeholder='Digite sua senha'
            className='w-full p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-700 placeholder-slate-400'
            required
          />
        </div>
        <button
          type='submit'
          className='w-full bg-slate-800 text-white p-2 rounded-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors duration-200'
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

        <div className='mt-6 space-y-3'>
          <GithubButton />
        </div>
      </div>

      <div className='mt-6 text-center'>
        <p className='text-sm text-slate-600'>
          Não tem uma conta?
          <Link
            href='/register'
            className='text-indigo-600 hover:text-indigo-500 hover:underline font-medium ml-1'
          >
            Registrar-se
          </Link>
        </p>
      </div>
    </div>
  );
}
