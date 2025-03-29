import Link from 'next/link';
import { RegisterForm } from '@/components/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <div className='max-w-md mx-auto p-6'>
      <div className='bg-white p-8 rounded-lg shadow'>
        <h1 className='text-2xl font-bold text-center mb-6'>Criar Conta</h1>
        <RegisterForm />

        <div className='mt-6 text-center'>
          <p className='text-sm text-gray-600'>
            Já tem uma conta?{' '}
            <Link href='/login' className='text-blue-600 hover:underline'>
              Faça login
            </Link>
          </p>
        </div>

        {/* Divisor opcional para login social */}
        <div className='flex items-center my-6'>
          <div className='flex-1 border-t border-gray-300'></div>
          <span className='px-3 text-gray-500 text-sm'>OU</span>
          <div className='flex-1 border-t border-gray-300'></div>
        </div>

        {/* Componente de login social (opcional) */}
        {/* <SocialButtons /> */}
      </div>
    </div>
  );
}
