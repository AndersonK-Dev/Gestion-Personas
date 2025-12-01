namespace GestionPersonasAPI.DTOs
{
    public class PersonaDto
    {
        public int Id { get; set; }
        public string NombreCompleto { get; set; }
        public string Email { get; set; }
        public int Edad { get; set; }
        public string Direccion { get; set; }
        public DateTime FechaCreacion { get; set; }
    }
}
