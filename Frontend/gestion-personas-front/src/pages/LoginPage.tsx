import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import { Lock } from 'lucide-react';

const LoginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { loginUser } = useAuth();

    const onSubmit = async (data: any) => {
        try {
            const token = await login(data.username, data.password);
            loginUser(token); // Guardamos token en contexto
            navigate('/personas'); // Redirigimos a la app
        } catch (error) {
            alert('Credenciales inválidas (Prueba: admin/password123)');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <div className="flex justify-center mb-6">
                    <div className="bg-blue-100 p-3 rounded-full">
                        <Lock className="w-8 h-8 text-blue-600" />
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Iniciar Sesión</h2>
                
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Usuario</label>
                        <input
                            {...register('username', { required: true })}
                            className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder=""
                        />
                        {errors.username && <span className="text-red-500 text-xs">Requerido</span>}
                    </div>
                    
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Contraseña</label>
                        <input
                            type="password"
                            {...register('password', { required: true })}
                            className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder=""
                        />
                        {errors.password && <span className="text-red-500 text-xs">Requerido</span>}
                    </div>
                    
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200">
                        Ingresar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;