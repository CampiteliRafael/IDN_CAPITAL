import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import '@testing-library/jest-dom';

import RegisterPage from '../page';
import authReducer from '@/lib/store/authSlice';
import { authService } from '@/lib/api/authService';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/lib/api/authService', () => ({
  authService: {
    register: jest.fn(),
  },
}));

function renderWithProviders(ui: React.ReactElement) {
  const store = configureStore({
    reducer: {
      auth: authReducer,
    },
  });

  return {
    store,
    user: userEvent.setup(),
    ...render(<Provider store={store}>{ui}</Provider>),
  };
}

describe('RegisterPage integration', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it('Must register a new user and redirect to dashboard', async () => {
    (authService.register as jest.Mock).mockResolvedValue({
      data: { user: { name: 'João Silva' } },
    });

    const { user } = renderWithProviders(<RegisterPage />);

    await user.type(screen.getByLabelText(/nome/i), 'João Silva');
    await user.type(screen.getByLabelText(/email/i), 'joao@teste.com');
    await user.type(screen.getByLabelText(/senha/i), '123456');

    const submitButton = screen.getByRole('button', { name: /cadastrar/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(authService.register).toHaveBeenCalledWith({
        name: 'João Silva',
        email: 'joao@teste.com',
        password: '123456',
      });
    });

    await waitFor(
      () => {
        expect(mockPush).toHaveBeenCalledWith('/dashboard');
      },
      { timeout: 3000 }
    );
  });

  it('It should show a loading status and disable the button during the request', async () => {
    (authService.register as jest.Mock).mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve({ data: { user: { name: 'João' } } }), 100)
        )
    );

    const { user } = renderWithProviders(<RegisterPage />);

    await user.type(screen.getByLabelText(/nome/i), 'João Silva');
    await user.type(screen.getByLabelText(/email/i), 'joao@teste.com');
    await user.type(screen.getByLabelText(/senha/i), '123456');

    const submitButton = screen.getByRole('button', { name: /cadastrar/i });
    await user.click(submitButton);

    expect(submitButton).toBeDisabled();
    expect(screen.getByText(/registrando/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('It should display an error message when registration fails', async () => {
    const errorMessage = 'Este email já está em uso';

    const axiosError = new AxiosError(
      'Request failed with status code 400',
      'ERR_BAD_REQUEST',
      {} as InternalAxiosRequestConfig,
      {},
      {
        status: 400,
        statusText: 'Bad Request',
        data: {
          error: { message: errorMessage },
        },
        headers: {},
        config: {} as InternalAxiosRequestConfig,
      } as AxiosResponse
    );

    (authService.register as jest.Mock).mockRejectedValue(axiosError);

    const { user } = renderWithProviders(<RegisterPage />);

    await user.type(screen.getByLabelText(/nome/i), 'João Silva');
    await user.type(screen.getByLabelText(/email/i), 'joao@teste.com');
    await user.type(screen.getByLabelText(/senha/i), '123456');

    await user.click(screen.getByRole('button', { name: /cadastrar/i }));

    const errorDiv = await screen.findByText(errorMessage);

    expect(errorDiv).toBeInTheDocument();
    expect(errorDiv).toHaveClass('text-red-200');
  });

  it('should clear error message when user starts typing again', async () => {
    const errorMessage = 'Erro de API';
    const axiosError = new AxiosError('', '', {} as any, {}, {
      data: { error: { message: errorMessage } },
      status: 400,
    } as any);

    (authService.register as jest.Mock).mockRejectedValue(axiosError);
    const { user } = renderWithProviders(<RegisterPage />);

    await user.type(screen.getByLabelText(/nome/i), 'João');
    await user.type(screen.getByLabelText(/email/i), 'teste@teste.com');
    await user.type(screen.getByLabelText(/senha/i), '123456');
    await user.click(screen.getByRole('button', { name: /cadastrar/i }));

    expect(await screen.findByText(errorMessage)).toBeInTheDocument();

    await user.type(screen.getByLabelText(/email/i), 'a');

    await waitFor(() => {
      expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();
    });
  });

  it('should redirect if user is already authenticated', async () => {
    const mockUser = {
      id: '1',
      email: 'joao@teste.com',
      name: 'João Silva',
      role: 'user' as any,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const store = configureStore({
      reducer: { auth: authReducer },
      preloadedState: {
        auth: { user: mockUser, isAuthenticated: true, loading: false, error: null },
      },
    });

    render(
      <Provider store={store}>
        <RegisterPage />
      </Provider>
    );

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/dashboard');
    });
  });
});
