// Espejo del PersonaDto del backend
export interface Persona {
    id: number;
    nombreCompleto: string;
    email: string;
    edad: number;
    direccion: string;
    fechaCreacion: string; // Las fechas vienen como string en JSON
}

// Espejo del PersonaCreateDto (lo que enviamos al crear/editar)
// Omitimos ID y FechaCreacion porque el backend los genera
export interface PersonaCreate {
    nombreCompleto: string;
    email: string;
    edad: number; // Zod manejará la conversión de string a number en el form
    direccion: string;
}

// Espejo del ExternalUserDto (API de gorest.co.in)
export interface ExternalUser {
    id: number;
    name: string;
    email: string;
    gender: string;
    status: string;
}

export interface PagedResult<T> {
    items: T[];
    totalCount: number;
    page: number;
    pageSize: number;
    totalPages: number;
}