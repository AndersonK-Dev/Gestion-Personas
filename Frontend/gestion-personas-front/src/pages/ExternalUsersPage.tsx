import { useExternalUsers } from "../hooks/usePersonas";
import { Mail, User, Activity } from "lucide-react";

const ExternalUsersPage = () => {
  // Usamos el hook específico para la API externa
  const { data: users, isLoading, isError } = useExternalUsers();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">
          No se pudieron cargar los datos del servicio externo (GoRest).
        </span>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Directorio Externo</h2>
        <p className="text-gray-600">Datos provenientes de gorest.co.in</p>
      </div>

      {/* Grid Responsivo: 1 col móvil, 2 cols tablet, 3 cols desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users?.map((user) => (
          <div
            key={user.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                {/* Avatar generado con las iniciales */}
                <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl mr-4">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {user.name}
                  </h3>
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      user.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {user.status.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-gray-600 text-sm">
                  <Mail className="w-4 h-4 mr-2" />
                  <span className="truncate">{user.email}</span>
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <User className="w-4 h-4 mr-2" />
                  <span>{user.gender}</span>
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <Activity className="w-4 h-4 mr-2" />
                  <span>ID: {user.id}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExternalUsersPage;
