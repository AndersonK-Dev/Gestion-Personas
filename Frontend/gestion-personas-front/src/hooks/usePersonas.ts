import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPersonas, getPersonaById, createPersona, updatePersona, deletePersona } from '../services/personasService';
import { getExternalUsers } from '../services/externalService';
import { type PersonaCreate } from '../models/types';

// Hook para obtener todas las personas
// Hook actualizado
export const usePersonas = (page: number, pageSize: number, search: string) => {
    return useQuery({
        // La queryKey incluye las variables. Si cambian, React Query refetch
        queryKey: ['personas', page, pageSize, search],
        queryFn: () => getPersonas(page, pageSize, search),
        placeholderData: (previousData) => previousData, // Mantiene los datos viejos mientras carga los nuevos (mejor UX)
    });
};

// Hook para obtener una sola persona
export const usePersona = (id: number) => {
    return useQuery({
        queryKey: ['personas', id],
        queryFn: () => getPersonaById(id),
        enabled: !!id, // Solo se ejecuta si hay un ID válido
    });
};

// Hook para obtener usuarios externos
export const useExternalUsers = () => {
    return useQuery({
        queryKey: ['externalUsers'],
        queryFn: getExternalUsers,
    });
};

// Hook para Mutaciones (Crear, Editar, Eliminar)
export const usePersonasMutations = () => {
    const queryClient = useQueryClient();

    const crearMutation = useMutation({
        mutationFn: createPersona,
        onSuccess: () => {
            // Invalidar la caché para que la lista se recargue automáticamente
            queryClient.invalidateQueries({ queryKey: ['personas'] });
        },
    });

    const actualizarMutation = useMutation({
        mutationFn: ({ id, data }: { id: number; data: PersonaCreate }) => updatePersona(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['personas'] });
        },
    });

    const eliminarMutation = useMutation({
        mutationFn: deletePersona,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['personas'] });
        },
    });

    return {
        crear: crearMutation,
        actualizar: actualizarMutation,
        eliminar: eliminarMutation,
    };
};