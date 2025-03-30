import { registerSchema } from '@/lib/schemas/auth-schema';

describe('registerSchema', () => {
  it('deve validar dados corretos', () => {
    const validData = {
      name: 'João Silva',
      email: 'joao@example.com',
      password: '123456',
      confirmPassword: '123456',
    };

    const result = registerSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('deve rejeitar nome com menos de 3 caracteres', () => {
    const invalidData = {
      name: 'Jo',
      email: 'joao@example.com',
      password: '123456',
      confirmPassword: '123456',
    };

    const result = registerSchema.safeParse(invalidData);
    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.errors[0].message).toBe(
        'Nome deve ter pelo menos 3 caracteres'
      );
    }
  });

  it('deve rejeitar email inválido', () => {
    const invalidData = {
      name: 'João Silva',
      email: 'email-invalido',
      password: '123456',
      confirmPassword: '123456',
    };

    const result = registerSchema.safeParse(invalidData);
    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.errors[0].message).toBe('E-mail inválido');
    }
  });

  it('deve rejeitar senha com menos de 6 caracteres', () => {
    const invalidData = {
      name: 'João Silva',
      email: 'joao@example.com',
      password: '12345',
      confirmPassword: '12345',
    };

    const result = registerSchema.safeParse(invalidData);
    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.errors[0].message).toBe(
        'Senha deve ter pelo menos 6 caracteres'
      );
    }
  });

  it('deve rejeitar quando as senhas não coincidem', () => {
    const invalidData = {
      name: 'João Silva',
      email: 'joao@example.com',
      password: '123456',
      confirmPassword: '654321',
    };

    const result = registerSchema.safeParse(invalidData);
    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.errors[0].message).toBe('Senhas não coincidem');
    }
  });
});
