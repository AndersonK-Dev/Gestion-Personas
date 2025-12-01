import api from '../api/axiosConfig';
import { type Persona, type PersonaCreate, type PagedResult } from '../models/types';

//Manejo del CRUD
// Obtener todas las personas
// recibe params y devuelve PagedResult
export const getPersonas = async (page: number, pageSize: number, search: string): Promise<PagedResult<Persona>> => {
    // Axios serializa los parámetros automáticamente
    const response = await api.get<PagedResult<Persona>>('/persons', {
        params: { page, pageSize, search }
    });
    return response.data;
};

// Obtener una persona por ID
export const getPersonaById = async (id: number): Promise<Persona> => {
    const response = await api.get<Persona>(`/persons/${id}`);
    return response.data;
};

// Crear una nueva persona
export const createPersona = async (persona: PersonaCreate): Promise<Persona> => {
    const response = await api.post<Persona>('/persons', persona);
    return response.data;
};

// Actualizar una persona
export const updatePersona = async (id: number, persona: PersonaCreate): Promise<void> => {
    await api.put(`/persons/${id}`, persona);
};

// Eliminar una persona
export const deletePersona = async (id: number): Promise<void> => {
    await api.delete(`/persons/${id}`);
};