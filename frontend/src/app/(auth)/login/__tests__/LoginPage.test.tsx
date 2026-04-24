import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from '../page';
import { useAppDispatch, useAppSelector, loginThunk, clearError } from '@/lib/store';
import { useRouter } from 'next/navigation';
import '@testing-library/jest-dom';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/lib/store', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
  loginThunk: jest.fn(),
  clearError: jest.fn(),
}));

describe('LoginPage', () => {
  const mockPush = jest.fn();
  const mockDispatch = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useAppDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (useAppSelector as unknown as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      isAuthenticated: false,
    });
  });

  test('Should update the fields of input and to call loginThunk after submit', async () => {
    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@teste.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'senha123' } });

    fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

    expect(loginThunk).toHaveBeenCalledWith({
      email: 'user@teste.com',
      password: 'senha123',
    });
  });

  test('Must redirect to /dashboard if user is already authenticated', async () => {
    (useAppSelector as unknown as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      isAuthenticated: true,
    });

    render(<LoginPage />);

    expect(mockPush).toHaveBeenCalledWith('/dashboard');
  });

  test('Must disable button and show "Loading..." during loading', async () => {
    (useAppSelector as unknown as jest.Mock).mockReturnValue({
      loading: true,
      error: null,
      isAuthenticated: false,
    });

    render(<LoginPage />);

    const button = screen.getByRole('button');

    expect(button).toBeDisabled();
    expect(button).toHaveTextContent(/entrando.../i);
    expect(screen.getByLabelText(/email/i)).toBeDisabled();
  });

  test('Must show error message when login fails', async () => {
    mockDispatch.mockRejectedValueOnce(new Error('Invalid credentials'));

    (useAppSelector as unknown as jest.Mock).mockReturnValue({
      loading: false,
      error: 'Invalid credentials',
      isAuthenticated: false,
    });

    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'errado@teste.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '123' } });
    fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

    expect(loginThunk).toHaveBeenCalledWith({
      email: 'errado@teste.com',
      password: '123',
    });

    expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
  });

  test('Must show error message coming of redux state', async () => {
    (useAppSelector as unknown as jest.Mock).mockReturnValue({
      loading: false,
      error: 'Previous error',
      isAuthenticated: false,
    });

    render(<LoginPage />);

    const emailInput = screen.getByLabelText(/email/i);

    fireEvent.change(emailInput, { target: { value: 'a' } });
    expect(mockDispatch).toHaveBeenCalled();
    expect(clearError).toHaveBeenCalled();
  });
});
