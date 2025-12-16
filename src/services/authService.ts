import apiClient from './api';

interface LoginCredentials {
    email: string;
    password: string;
}

interface RegisterData {
    name: string;
    email: string;
    password: string;
}

interface User {
    id: number;
    name: string;
    email: string;
}

interface LoginResponse {
    success: boolean;
    message?: string;
    data?: {
        user: User;
        token: string;
    };
}

class AuthService {
    /**
     * Login user with email and password
     */
    async login(credentials: LoginCredentials): Promise<LoginResponse> {
        const response = await apiClient.post('/auth/login', credentials);

        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }

        return response.data;
    }

    /**
     * Login user with 4-digit code
     */
    async loginWithCode(code: string): Promise<LoginResponse> {
        const response = await apiClient.post('/auth/login', { code });

        if (response.data.success && response.data.data) {
            localStorage.setItem('token', response.data.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.data.user));
        }

        return response.data;
    }

    /**
     * Register new user
     */
    async register(data: RegisterData) {
        const response = await apiClient.post('/auth/register', data);

        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }

        return response.data;
    }

    /**
     * Logout user
     */
    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    }

    /**
     * Get current user from localStorage
     */
    getCurrentUser(): User | null {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            return JSON.parse(userStr);
        }
        return null;
    }

    /**
     * Check if user is authenticated
     */
    isAuthenticated(): boolean {
        return !!localStorage.getItem('token');
    }

    /**
     * Get auth token
     */
    getToken(): string | null {
        return localStorage.getItem('token');
    }
}

export default new AuthService();
