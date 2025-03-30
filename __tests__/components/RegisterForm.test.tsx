import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { registerUser } from '@/lib/auth/actions';

// Mock da função registerUser
jest.mock('@/lib/auth/actions', () => ({
  registerUser: jest.fn(),
}));

describe('RegisterForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar o formulário corretamente', () => {
    render(<RegisterForm />);

    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^senha$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirmar senha/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /criar conta/i })
    ).toBeInTheDocument();
  });

  it('deve chamar registerUser com os dados corretos quando o formulário é válido', async () => {
    const user = userEvent.setup();
    (registerUser as jest.Mock).mockResolvedValue({ success: true });

    render(<RegisterForm />);

    await user.type(screen.getByLabelText(/nome/i), 'João Silva');
    await user.type(screen.getByLabelText(/e-mail/i), 'joao@example.com');
    await user.type(screen.getByLabelText(/^senha$/i), '123456');
    await user.type(screen.getByLabelText(/confirmar senha/i), '123456');

    await user.click(screen.getByRole('button', { name: /criar conta/i }));

    expect(registerUser).toHaveBeenCalledWith({
      name: 'João Silva',
      email: 'joao@example.com',
      password: '123456',
      confirmPassword: '123456',
    });
  });

  it('deve mostrar erro quando o registro falha', async () => {
    const user = userEvent.setup();
    const errorMessage = 'Email já cadastrado';
    (registerUser as jest.Mock).mockResolvedValue({
      error: { email: [errorMessage] },
    });

    render(<RegisterForm />);

    await user.type(screen.getByLabelText(/nome/i), 'João Silva');
    await user.type(screen.getByLabelText(/e-mail/i), 'joao@example.com');
    await user.type(screen.getByLabelText(/^senha$/i), '123456');
    await user.type(screen.getByLabelText(/confirmar senha/i), '123456');

    await user.click(screen.getByRole('button', { name: /criar conta/i }));

    await waitFor(
      () => {
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });
});
