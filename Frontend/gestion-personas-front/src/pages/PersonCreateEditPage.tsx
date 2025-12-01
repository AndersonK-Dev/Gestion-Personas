import { useParams, useNavigate } from 'react-router-dom';
import { usePersona, usePersonasMutations } from '../hooks/usePersonas';
import PersonForm from '../components/forms/PersonForm';
import { type PersonaFormData } from '../models/schemas';

const PersonCreateEditPage = () => {
    const { id } = useParams(); // Obtenemos el ID de la URL
    const navigate = useNavigate();
    const isEditMode = !!id;
    
    // Hooks de React Query
    const { crear, actualizar } = usePersonasMutations();
    const { data: personaExistente, isLoading: isLoadingData } = usePersona(Number(id));

    // Manejo del envío del formulario
    const handleFormSubmit = async (data: PersonaFormData) => {
        try {
            if (isEditMode && id) {
                await actualizar.mutateAsync({ id: Number(id), data });
                alert('Persona actualizada correctamente');
            } else {
                await crear.mutateAsync(data);
                // alert('Persona creada correctamente'); // Opcional, React Query actualiza rápido
            }
            // Redirigir a la lista
            navigate('/personas');
        } catch (error: any) {
            console.error(error);
            // Si el backend devuelve error (ej. email duplicado), lo mostramos
            const mensaje = error.response?.data || 'Ocurrió un error al guardar.';
            alert(`Error: ${mensaje}`);
        }
    };

    // Si estamos en modo edición y cargando datos
    if (isEditMode && isLoadingData) {
        return <div className="text-center mt-10">Cargando datos de la persona...</div>;
    }

    return (
        <div className="max-w-lg mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
                {isEditMode ? 'Editar Persona' : 'Nueva Persona'}
            </h2>
            
            <PersonForm 
                initialData={personaExistente} // Si es undefined (modo crear), el form usa valores por defecto
                onSubmit={handleFormSubmit}
                isLoading={crear.isPending || actualizar.isPending}
            />
        </div>
    );
};

export default PersonCreateEditPage;