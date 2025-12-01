using GestionPersonasAPI.DTOs;
using GestionPersonasAPI.Interfaces;
using System.Text.Json;

namespace GestionPersonasAPI.Services
{
    public class ExternalUserService : IExternalUserService
    {
        private readonly HttpClient _httpClient;

        // Inyectamos HttpClient ya configurado
        public ExternalUserService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }
        public async Task<IEnumerable<ExternalUserDto>> GetExternalUsersAsync()
        {
            try
            {
                // Llamamos al recurso - url directa en program
                var response = await _httpClient.GetAsync("users");

                // Erro en API 404 , lanzamos excepción
                response.EnsureSuccessStatusCode();

                var content = await response.Content.ReadAsStringAsync();

                // Deserializamos el JSON
                var users = JsonSerializer.Deserialize<IEnumerable<ExternalUserDto>>(content, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

                return users ?? new List<ExternalUserDto>();
            }
            catch (HttpRequestException ex)
            {
                // Manejo de errores de red
                // Retornamos lista vacía
                Console.WriteLine($"Error al conectar con servicio externo: {ex.Message}");
                return new List<ExternalUserDto>();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error inesperado: {ex.Message}");
                return new List<ExternalUserDto>();
            }
        }
    }
}
