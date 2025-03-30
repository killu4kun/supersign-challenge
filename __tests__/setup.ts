import '@testing-library/jest-dom';

// Configuração global para testes
beforeAll(() => {
  // Configurações que devem ser executadas antes de todos os testes
});

afterAll(() => {
  // Limpeza após todos os testes
});

// Configuração de mocks globais
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}));
