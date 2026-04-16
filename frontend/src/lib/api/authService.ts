import api from './axios'
import { LoginDto, RegisterDto, LoginResponse, RegisterResponse, ApiResponse, LogoutResponse } from '../types/auth';


export const authService = {

    login: async (credentials: LoginDto): Promise<LoginResponse> => {
        const response = await api.post<LoginResponse>('/auth/login', credentials);
        return response.data;
    },

    register: async (userData: RegisterDto): Promise<RegisterResponse> => {
        const response = await api.post<RegisterResponse>('/auth/register', userData);
        return response.data;
    },

    logout: async (): Promise<ApiResponse<LogoutResponse>> => {
        const response = await api.post<ApiResponse<LogoutResponse>>('/auth/logout');
        return response.data;
    }
}

