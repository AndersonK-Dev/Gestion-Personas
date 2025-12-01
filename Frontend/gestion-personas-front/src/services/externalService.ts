import api from '../api/axiosConfig';
import { type ExternalUser } from '../models/types';

// Obtener usuarios externos (Passthrough via tu Backend)
export const getExternalUsers = async (): Promise<ExternalUser[]> => {
    const response = await api.get<ExternalUser[]>('/external-users');
    return response.data;
};