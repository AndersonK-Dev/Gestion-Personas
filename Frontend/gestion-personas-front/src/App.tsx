import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Importación de Páginas
import PersonasPage from "./pages/PersonasPage";
import PersonCreateEditPage from "./pages/PersonCreateEditPage";
import ExternalUsersPage from "./pages/ExternalUsersPage";
import LoginPage from "./pages/LoginPage";

// Cliente de React Query
const queryClient = new QueryClient();

// --- COMPONENTE LAYOUT (Navbar) ---
// Este componente decide si mostrar el menú o no, basado en si estás logueado
const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, logoutUser } = useAuth();

  // Si NO está autenticado (está en login), renderiza solo el contenido (sin navbar)
  if (!isAuthenticated) {
    return <>{children}</>;
  }

  // Si ESTÁ autenticado, muestra Navbar + Contenido
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <nav className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-tight">Gestión Personas</h1>
          <div className="flex items-center space-x-6">
            <Link
              to="/personas"
              className="hover:text-blue-200 transition-colors"
            >
              Personas
            </Link>
            <Link
              to="/usuarios-externos"
              className="hover:text-blue-200 transition-colors"
            >
              Externos
            </Link>
            <button
              onClick={logoutUser}
              className="bg-blue-700 hover:bg-blue-800 px-4 py-1.5 rounded text-sm font-medium transition-colors border border-blue-500"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </nav>
      <main className="container mx-auto p-6 flex-grow">{children}</main>
    </div>
  );
};

// --- COMPONENTE RUTA PROTEGIDA ---
// Si intentas entrar aquí sin token, te patea al Login
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// --- APP PRINCIPAL ---
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* AuthProvider debe envolver TODO para que el contexto funcione */}
      <AuthProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              {/* Ruta Pública: Login */}
              <Route path="/login" element={<LoginPage />} />

              {/* Ruta Pública: Directorio Externo (según requerimiento) */}
              <Route
                path="/usuarios-externos"
                element={<ExternalUsersPage />}
              />

              {/* --- RUTAS PROTEGIDAS (Requieren Login) --- */}
              <Route
                path="/personas"
                element={
                  <ProtectedRoute>
                    <PersonasPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/personas/crear"
                element={
                  <ProtectedRoute>
                    <PersonCreateEditPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/personas/editar/:id"
                element={
                  <ProtectedRoute>
                    <PersonCreateEditPage />
                  </ProtectedRoute>
                }
              />

              {/* Redirección por defecto: Si entra a la raíz, intenta ir a personas (y el ProtectedRoute lo mandará a login si hace falta) */}
              <Route path="/" element={<Navigate to="/personas" replace />} />
              <Route path="*" element={<Navigate to="/personas" replace />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
