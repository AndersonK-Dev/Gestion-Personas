# 👥 PersonasHub: Sistema de Gestión Empresarial
### **Full-Stack Solution | .NET 8 + React + SQL Server**

![.NET 8](https://img.shields.io/badge/.NET_8-512BD4?style=for-the-badge&logo=dotnet&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![SQL Server](https://img.shields.io/badge/SQL_Server-CC2927?style=for-the-badge&logo=microsoft-sql-server&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=json-web-tokens&logoColor=white)

Este proyecto es una solución integral para la gestión de personal, diseñada bajo estándares de **Clean Architecture** y principios **SOLID**. Implementa un flujo completo de datos, desde la persistencia en SQL Server hasta una interfaz moderna y reactiva construida con tecnologías de vanguardia.

---

## 🛠️ Especificaciones Técnicas

* **Backend:** API robusta construida con **.NET 8**, utilizando **Entity Framework Core** para el mapeo de datos y una arquitectura por capas que asegura el desacoplamiento y la escalabilidad.
* **Frontend:** Aplicación de alto rendimiento desarrollada con **React** y **Vite**, utilizando **Tailwind CSS** para un diseño responsivo y profesional.
* **Seguridad:** Autenticación y autorización implementadas mediante **JWT (JSON Web Tokens)** para proteger la integridad de los recursos.
* **Documentación:** Exposición y pruebas de endpoints facilitadas por la integración nativa de **Swagger**.

---

## 🚀 Guía de Instalación

### Requisitos Previos
* **IDE:** Visual Studio 2022 o VS Code.
* **SDK:** .NET SDK 8.0.
* **Entorno:** Node.js y SQL Server (LocalDB).

### 1. Configuración de la Base de Datos
La base de datos se puede inicializar mediante dos métodos:

> [!IMPORTANT]
> **Opción A (Recomendada):** Entity Framework Migrations.
> 1. Abre la **Consola de Administración de Paquetes** en Visual Studio.
> 2. Asegúrate de estar en el proyecto del Backend y ejecuta: `Update-Database`.

**Opción B (Manual):** Ejecuta el archivo `Script_Creacion_Datos.sql` ubicado en la carpeta `/2. BaseDeDatos`.

### 2. Despliegue del Backend
1. Abre la solución `GestionPersonasSolution.sln` y ejecuta el proyecto `GestionPersonasAPI`.
2. La API se servirá por defecto en: `https://localhost:7138`.* Puede verificar el puerto en el archivo "launchSettings.json".

### 3. Despliegue del Frontend
```bash
# Navegar al directorio del frontend
cd 1. CodigoFuente/Frontend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

---

## 🚀 Acceso y Ejecución
Una vez iniciados ambos servicios, puedes acceder a la interfaz de usuario en:
> **URL local:** [http://localhost:5173](http://localhost:5173)

### 4. 🔐 Credenciales de Acceso
El sistema cuenta con un módulo de seguridad basado en **JWT** para proteger las operaciones de escritura (CUD):

* **Usuario:** `admin`
* **Contraseña:** `password123`

## 📈 Capacidades de Ingeniería Aplicadas
Como **Ingeniero en Ciencias de la Computación**, este proyecto integra las siguientes competencias técnicas:

* **CRUD Completo:** Gestión estricta de entidades con validaciones robustas del lado del servidor utilizando **.NET 8**.
* **Paginación Dinámica:** Optimización de la carga de datos y consultas SQL para mejorar el rendimiento y la experiencia del cliente.
* **Consumo de APIs Externas:** Integración de servicios externos para enriquecer la funcionalidad y los datos del sistema.
* **Principios SOLID:** Arquitectura de software mantenible, testeable y alineada a las mejores prácticas de la industria.

---

<div align="center">

### 👨‍💻 Desarrollado por **Kevin Anderson**
Conecta conmigo en [LinkedIn](https://www.linkedin.com/in/kevinchuga) para hablar sobre tecnología y proyectos.

</div>
