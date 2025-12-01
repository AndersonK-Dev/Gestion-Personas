import { z } from 'zod';

// Definimos las reglas de validación
export const personaSchema = z.object({
    nombreCompleto: z.string()
        .min(3, "El nombre debe tener al menos 3 caracteres")
        .max(100, "El nombre no puede exceder los 100 caracteres"),
    
    email: z.string()
        .email("Debe ser un correo electrónico válido")
        .min(1, "El correo es obligatorio"),
    
    edad: z.number({ error: "La edad debe ser un número" })
        .int("La edad debe ser un número entero")
        .min(18, "La edad mínima es 18 años")
        .max(120, "La edad máxima es 120 años"), // Validaciones lógicas
        
    direccion: z.string().optional(), // Campo opcional
});

// Exportamos el tipo inferido para usarlo en el formulario
export type PersonaFormData = z.infer<typeof personaSchema>;