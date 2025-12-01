using System.ComponentModel.DataAnnotations;
namespace GestionPersonasAPI.Models
{
    public class Persona
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string NombreCompleto { get; set; }

        [Required]
        [EmailAddress]
        [MaxLength(100)]
        public string Email { get; set; } // validaciones

        [Required]
        public int Edad { get; set; }

        [MaxLength(200)]
        public string Direccion { get; set; }

        public DateTime FechaCreacion { get; set; } = DateTime.Now;
    }
}
