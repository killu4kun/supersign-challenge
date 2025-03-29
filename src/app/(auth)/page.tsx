'use client';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    });
    if (result?.ok) router.push('/dashboard');
  };

  return (
    <div className='max-w-md mx-auto mt-10 p-6 bg-white rounded shadow'>
      <h1 className='text-2xl font-bold mb-4'>Login</h1>
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
          placeholder='Password'
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
