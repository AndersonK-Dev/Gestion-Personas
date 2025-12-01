import { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePersonas, usePersonasMutations } from '../hooks/usePersonas';
import { Trash2, Edit, Plus, AlertCircle, Search, ChevronLeft, ChevronRight } from 'lucide-react';

const PersonasPage = () => {
    // 1. Estados locales para controlar la Paginación y Búsqueda
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const pageSize = 5; // Cantidad de registros por página

    // 2. Usamos el Hook actualizado que recibe parámetros (page, pageSize, search)
    // React Query detectará cambios en estas variables y refrescará los datos automáticamente.
    const { data: pagedResult, isLoading, isError, error } = usePersonas(page, pageSize, search);
    
    const { eliminar } = usePersonasMutations();

    // Función para confirmar antes de eliminar
    const handleDelete = async (id: number) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta persona?')) {
            try {
                await eliminar.mutateAsync(id);
                // No hace falta recargar, React Query actualiza la lista
            } catch (error) {
                alert('Error al eliminar la persona');
            }
        }
    };

    // Función para manejar la búsqueda
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setPage(1); // Siempre que buscamos, reseteamos a la página 1
    };

    // Renderizado de Estado: Cargando (Solo si no hay datos previos para evitar parpadeos)
    if (isLoading && !pagedResult) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    // Renderizado de Estado: Error
    if (isError) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">No se pudieron cargar los datos. {(error as Error).message}</span>
            </div>
        );
    }

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            {/* Cabecera con Buscador y Botón Nuevo */}
            <div className="px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center bg-gray-50 gap-4">
                <h2 className="text-xl font-semibold text-gray-800">Listado de Personas</h2>
                
                <div className="flex items-center gap-4 w-full sm:w-auto">
                    {/* Barra de Búsqueda */}
                    <div className="relative w-full sm:w-64">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-blue-300 focus:shadow-outline-blue sm:text-sm transition duration-150 ease-in-out"
                            placeholder="Buscar por nombre o email..."
                            value={search}
                            onChange={handleSearch}
                        />
                    </div>

                    <Link 
                        to="/personas/crear" 
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center transition duration-150 ease-in-out whitespace-nowrap"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Nueva
                    </Link>
                </div>
            </div>

            {/* Tabla Responsiva */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Edad</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dirección</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {pagedResult?.items.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                                    <div className="flex flex-col items-center justify-center">
                                        <AlertCircle className="h-10 w-10 text-gray-400 mb-2"/>
                                        <p>No se encontraron resultados.</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            /* Iteramos sobre pagedResult.items, no sobre personas directamente */
                            pagedResult?.items.map((persona) => (
                                <tr key={persona.id} className="hover:bg-gray-50 transition duration-150">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{persona.nombreCompleto}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{persona.email}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                            {persona.edad} años
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {persona.direccion || '-'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                        <Link 
                                            to={`/personas/editar/${persona.id}`} 
                                            className="text-indigo-600 hover:text-indigo-900 inline-block"
                                            title="Editar"
                                        >
                                            <Edit className="w-5 h-5" />
                                        </Link>
                                        <button 
                                            onClick={() => handleDelete(persona.id)}
                                            className="text-red-600 hover:text-red-900 inline-block"
                                            title="Eliminar"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Footer con Controles de Paginación */}
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700">
                            Mostrando página <span className="font-medium">{pagedResult?.page}</span> de <span className="font-medium">{pagedResult?.totalPages}</span> (Total: {pagedResult?.totalCount})
                        </p>
                    </div>
                    <div>
                        <nav className="relative z-0 inline-flex shadow-sm -space-x-px">
                            <button
                                onClick={() => setPage(old => Math.max(old - 1, 1))}
                                disabled={page === 1}
                                className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${page === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'}`}
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </button>
                            <button
                                onClick={() => setPage(old => (pagedResult && old < pagedResult.totalPages ? old + 1 : old))}
                                disabled={!pagedResult || page >= pagedResult.totalPages}
                                className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${(!pagedResult || page >= pagedResult.totalPages) ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'}`}
                            >
                                <ChevronRight className="h-5 w-5" />
                            </button>
                        </nav>
                    </div>
                </div>
                
                {/* Versión móvil simple de la paginación */}
                <div className="flex items-center justify-between w-full sm:hidden">
                    <button
                         onClick={() => setPage(old => Math.max(old - 1, 1))}
                         disabled={page === 1}
                         className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                    >
                        Anterior
                    </button>
                    <span className="text-sm text-gray-700">
                        Pág {pagedResult?.page}
                    </span>
                    <button
                        onClick={() => setPage(old => (pagedResult && old < pagedResult.totalPages ? old + 1 : old))}
                        disabled={!pagedResult || page >= pagedResult.totalPages}
                        className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                    >
                        Siguiente
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PersonasPage;