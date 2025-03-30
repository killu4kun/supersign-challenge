import Link from 'next/link';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { GithubButton } from '@/components/auth/GihubButton';

export default function RegisterPage() {
  return (
    <div className='max-w-md mx-auto p-6'>
      <div className='bg-white p-8 rounded-lg shadow-md'>
        <h1 className='text-2xl font-bold text-center mb-6 text-slate-800'>
          Criar Conta
        </h1>
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

        <div className='mt-6 text-center'>
          <p className='text-sm text-slate-600'>
            Já tem uma conta?{' '}
            <Link
              href='/'
              className='text-indigo-600 hover:text-indigo-500 hover:underline'
            >
              Faça login
            </Link>
          </p>
        </div>

        {/* Divisor opcional para login social */}
        <div className='flex items-center my-6'>
          <div className='flex-1 border-t border-slate-200'></div>
          <span className='px-3 text-slate-500 text-sm'>OU</span>
          <div className='flex-1 border-t border-slate-200'></div>
        </div>

        {/* Componente de login social (opcional) */}
        {/* <SocialButtons /> */}
      </div>
    </div>
  );
}
