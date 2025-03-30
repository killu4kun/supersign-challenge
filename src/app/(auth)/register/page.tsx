import Link from 'next/link';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { GithubButton } from '@/components/auth/GihubButton';

export default function RegisterPage() {
  return (
    <div className='min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg'>
        <div>
          <h1 className='text-3xl font-bold text-center text-slate-800'>
            Criar Conta
          </h1>
          <p className='mt-2 text-center text-sm text-slate-600'>
            Crie sua conta para começar a usar o SuperSign
          </p>
        </div>

        <RegisterForm />

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

        <div className='text-center'>
          <p className='text-sm text-slate-600'>
            Já tem uma conta?{' '}
            <Link
              href='/'
              className='font-medium text-indigo-600 hover:text-indigo-500 hover:underline'
            >
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
