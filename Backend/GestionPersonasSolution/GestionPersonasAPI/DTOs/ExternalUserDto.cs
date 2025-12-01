using System.Text.Json.Serialization;

namespace GestionPersonasAPI.DTOs
{
    // Mapeo de respuesta https://gorest.co.in/public/v2/users
    public class ExternalUserDto
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("email")]
        public string Email { get; set; }

        [JsonPropertyName("gender")]
        public string Gender { get; set; }

        [JsonPropertyName("status")]
        public string Status { get; set; }
    }
}
