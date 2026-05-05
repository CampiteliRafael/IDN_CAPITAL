import { render, screen, fireEvent } from '@testing-library/react';
import RegisterPage from '../page';
import { useAppDispatch, useAppSelector, registerThunk, clearError } from '@/lib/store';
import { useRouter } from 'next/navigation';
import '@testing-library/jest-dom';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/lib/store', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
  registerThunk: jest.fn(),
  clearError: jest.fn(),
}));

describe('RegisterPage', () => {
  const mockPush = jest.fn();
  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useAppDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);

    mockDispatch.mockReturnValue({
      unwrap: jest.fn().mockResolvedValue({}),
    });
    (useAppSelector as unknown as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      isAuthenticated: false,
    });
  });

  test('Must update the fields and call registerThunk on form submission', async () => {
    render(<RegisterPage />);

    fireEvent.change(screen.getByLabelText(/nome/i), { target: { value: 'João Silva' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'teste@email.com' } });
    fireEvent.change(screen.getByLabelText(/senha/i), { target: { value: 'senha123' } });
    fireEvent.click(screen.getByRole('button', { name: /cadastrar/i }));

    expect(registerThunk).toHaveBeenCalledWith({
      name: 'João Silva',
      email: 'teste@email.com',
      password: 'senha123',
    });
  });

  test('Must redirect to the dashboard if the user is already authenticated', () => {
    (useAppSelector as unknown as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      isAuthenticated: true,
    });

    render(<RegisterPage />);

    expect(mockPush).toHaveBeenCalledWith('/dashboard');
  });

  test('The error should be cleared when the user starts typing again', () => {
    (useAppSelector as unknown as jest.Mock).mockReturnValue({
      loading: false,
      error: 'Erro de registro',
      isAuthenticated: false,
    });

    render(<RegisterPage />);
    const emailInput = screen.getByLabelText(/email/i);

    fireEvent.change(emailInput, { target: { value: 'novo@email.com' } });

    expect(mockDispatch).toHaveBeenCalledWith(clearError());
  });

  test('You should disable fields and display "Registering..." during loading', () => {
    (useAppSelector as unknown as jest.Mock).mockReturnValue({
      loading: true,
      error: null,
      isAuthenticated: false,
    });

    render(<RegisterPage />);

    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByRole('button')).toHaveTextContent(/registrando.../i);
    expect(screen.getByLabelText(/nome/i)).toBeDisabled();
    expect(screen.getByLabelText(/email/i)).toBeDisabled();
  });
});
