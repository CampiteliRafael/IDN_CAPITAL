export enum Role {
    USER = "USER",
    ADMIN = "ADMIN",
}

export interface User {
    id: string;
    email: string;
    name: string;
    role: Role;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: {
        message: string;
        code:string;
        details?: any[];
    }
}

export interface LoginDto {
    email: string;
    password: string;
}

export interface RegisterDto {
    email: string;
    password: string;
    name: string;
    role?: Role;
}

export interface AuthResponse {
    user: User;
}

export interface LogoutResponse {
    message: string;
}

export type LoginResponse = ApiResponse<AuthResponse>;
export type RegisterResponse = ApiResponse<AuthResponse>;