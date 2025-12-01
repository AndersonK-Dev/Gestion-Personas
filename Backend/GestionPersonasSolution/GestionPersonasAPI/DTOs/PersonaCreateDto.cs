using System.ComponentModel.DataAnnotations;

namespace GestionPersonasAPI.DTOs
{
    public class PersonaCreateDto
    {
        [Required(ErrorMessage = "El nombre es obligatorio")]
        [StringLength(100)]
        public string NombreCompleto { get; set; }

        [Required(ErrorMessage = "El email es obligatorio")]
        [EmailAddress(ErrorMessage = "Formato de email inválido")]
        public string Email { get; set; }

        [Range(1, 120, ErrorMessage = "La edad debe estar entre 1 y 120")]
        public int Edad { get; set; }

        public string Direccion { get; set; }
    }
}
