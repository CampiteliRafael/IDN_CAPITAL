import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { authService } from "../api/authService";
import { LoginDto, RegisterDto, User } from "../types/auth";

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

export const loginThunk = createAsyncThunk(
    'auth/login',
    async (credentials: LoginDto, { rejectWithValue }) => {
        try {
            const response = await authService.login(credentials);
            return response.data!.user;
        } catch (error: any) {
            const message = error.response?.data?.error?.message || 'Login failed';
            return rejectWithValue(message);
        }
    }
);

export const registerThunk = createAsyncThunk(
    'auth/register',
    async (userData: RegisterDto, { rejectWithValue }) => {
        try {
            const response = await authService.register(userData);
            return response.data!.user;
        } catch (error: any) {
            const message = error.response?.data?.error?.message || 'Registration failed';
            return rejectWithValue(message);
        }
    }
);

export const logoutThunk = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            await authService.logout();
            return;
        } catch (error: any) {
            const message = error.response?.data?.error?.message || 'Logout failed';
            return rejectWithValue(message);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload;
            state.isAuthenticated = action.payload !== null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            }
            )
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
                state.error = null;
            }
            )
            .addCase(loginThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            }
            )
            .addCase(registerThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            }
            )
            .addCase(registerThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
                state.error = null;
            }
            )
            .addCase(registerThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            }
            )
            .addCase(logoutThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            }
            )
            .addCase(logoutThunk.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.error = null;
            }
            )
            .addCase(logoutThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            }
            );
    },
});

export const { clearError, setUser } = authSlice.actions;

export default authSlice.reducer;

