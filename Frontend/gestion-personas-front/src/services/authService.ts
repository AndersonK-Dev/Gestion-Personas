import api from '../api/axiosConfig';

interface LoginResponse {
    token: string;
}

export const login = async (username: string, password: string): Promise<string> => {
    const response = await api.post<LoginResponse>('/auth/login', { username, password });
    return response.data.token;
};