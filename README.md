=================================================================
 PROYECTO: GESTIÓN DE PERSONAS (.NET 8 + REACT)
=================================================================

DESCRIPCIÓN
-----------
Desarrollo para la gestión de personas con operaciones CRUD,
paginación, seguridad JWT y consumo de API externa.

REQUISITOS PREVIOS
------------------
1. Visual Studio 2022 o VS Code.
2. .NET SDK 8.0.
3. Node.js instalado.
4. SQL Server (LocalDB viene incluido con Visual Studio).

=================================================================
 INSTRUCCIONES DE INSTALACIÓN (¡IMPORTANTE!)
=================================================================

PASO 1: CONFIGURAR BASE DE DATOS
--------------------------------
La base de datos NO se incluye en el código, debe generarse en su máquina.
Tiene dos opciones para hacerlo:

OPCIÓN A (Automática con Visual Studio):
1. Abra el archivo "GestionPersonasSolution.sln" en la carpeta "1_CodigoFuente/Backend".
2. Vaya a Herramientas > Administrador de paquetes NuGet > Consola.
3. Ejecute el comando: Update-Database
   (Esto creará la BD "GestionPersonasDB" en su LocalDB automáticamente).

OPCIÓN B (Manual con Script SQL):
1. Abra SQL Server Management Studio.
2. Ejecute el archivo "Script_Creacion_Datos.sql" que está en la carpeta "2. BaseDeDatos".

PASO 2: EJECUTAR EL BACKEND
---------------------------
1. En Visual Studio, ejecute el proyecto "GestionPersonasAPI".
2. Asegúrese de que el Backend esté corriendo en el puerto HTTPS (ej. https://localhost:7138).
   * Puede verificar el puerto en el archivo "launchSettings.json".

PASO 3: EJECUTAR EL FRONTEND
----------------------------
1. Abra una terminal en la carpeta "1. CodigoFuente/Frontend".
2. Ejecute: npm install
   (Esto descargará las dependencias necesarias).
3. Ejecute: npm run dev
4. Abra el navegador en la URL que indique (usualmente http://localhost:5173).

=================================================================
 CREDENCIALES DE ACCESO
=================================================================
El sistema está protegido. Para crear, editar o eliminar registros
debe iniciar sesión con el usuario administrador:

Usuario:    admin
Contraseña: password123

