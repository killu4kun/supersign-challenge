'use client';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

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
    <div className='max-w-md mx-auto mt-10 p-6 bg-white rounded shadow'>
      <h1 className='text-2xl font-bold mb-4'>Login</h1>

      {error && (
        <div className='mb-4 p-3 bg-red-100 text-red-700 rounded'>{error}</div>
      )}

      {searchParams.get('registered') && (
        <div className='mb-4 p-3 bg-green-100 text-green-700 rounded'>
          Conta criada com sucesso! Faça login para continuar.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          name='email'
          type='email'
          placeholder='Email'
          className='w-full p-2 mb-3 border rounded'
          required
        />
        <input
          name='password'
          type='password'
          placeholder='Senha'
          className='w-full p-2 mb-4 border rounded'
          required
        />
        <button
          type='submit'
          className='w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700'
        >
          Entrar
        </button>
      </form>
      <div className='mt-6 text-center'>
        <p className='text-sm text-gray-600'>
          Não tem uma conta?
          <Link
            href='/register'
            className='text-blue-600 hover:underline font-medium'
          >
            Registrar-se
          </Link>
        </p>
      </div>
    </div>
  );
}
