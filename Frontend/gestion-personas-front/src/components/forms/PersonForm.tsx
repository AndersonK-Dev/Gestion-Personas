import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { personaSchema, type PersonaFormData } from '../../models/schemas';
import { Save, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PersonFormProps {
    initialData?: PersonaFormData; // Opcional: Si viene, es edición
    onSubmit: (data: PersonaFormData) => void;
    isLoading: boolean;
}

const PersonForm = ({ initialData, onSubmit, isLoading }: PersonFormProps) => {
    
    // Inicializamos el hook con Zod como validador
    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm<PersonaFormData>({
        resolver: zodResolver(personaSchema),
        defaultValues: initialData || { edad: 18 } // Valor por defecto
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
            
            {/* Campo: Nombre Completo */}
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombreCompleto">
                    Nombre Completo
                </label>
                <input
                    {...register('nombreCompleto')}
                    id="nombreCompleto"
                    type="text"
                    placeholder="Ej. Juan Pérez"
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.nombreCompleto ? 'border-red-500' : ''}`}
                />
                {errors.nombreCompleto && (
                    <p className="text-red-500 text-xs italic mt-1">{errors.nombreCompleto.message}</p>
                )}
            </div>

            {/* Campo: Email */}
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Correo Electrónico
                </label>
                <input
                    {...register('email')}
                    id="email"
                    type="email"
                    placeholder="juan@ejemplo.com"
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''}`}
                />
                {errors.email && (
                    <p className="text-red-500 text-xs italic mt-1">{errors.email.message}</p>
                )}
            </div>

            {/* Campo: Edad */}
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="edad">
                    Edad
                </label>
                <input
                    {...register('edad', { valueAsNumber: true })} // Importante: convertir a número
                    id="edad"
                    type="number"
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.edad ? 'border-red-500' : ''}`}
                />
                {errors.edad && (
                    <p className="text-red-500 text-xs italic mt-1">{errors.edad.message}</p>
                )}
            </div>

            {/* Campo: Dirección */}
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="direccion">
                    Dirección (Opcional)
                </label>
                <input
                    {...register('direccion')}
                    id="direccion"
                    type="text"
                    placeholder="Calle Falsa 123"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>

            {/* Botones de Acción */}
            <div className="flex items-center justify-between">
                <Link 
                    to="/personas"
                    className="text-gray-500 hover:text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
                >
                    <X className="w-4 h-4 mr-2" /> Cancelar
                </Link>
                
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center transition duration-150 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    <Save className="w-4 h-4 mr-2" />
                    {isLoading ? 'Guardando...' : 'Guardar Persona'}
                </button>
            </div>
        </form>
    );
};

export default PersonForm;