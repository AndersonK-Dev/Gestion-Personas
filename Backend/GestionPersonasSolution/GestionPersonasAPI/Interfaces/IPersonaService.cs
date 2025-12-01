using GestionPersonasAPI.DTOs;

namespace GestionPersonasAPI.Interfaces
{
    public interface IPersonaService
    {
        // Clase de responder al paginado
        Task<PagedResultDto<PersonaDto>> GetAllPagedAsync(int page, int pageSize, string search);
        Task<PersonaDto?> GetByIdAsync(int id);
        Task<PersonaDto> CreateAsync(PersonaCreateDto personaDto);
        Task<bool> UpdateAsync(int id, PersonaCreateDto personaDto);
        Task<bool> DeleteAsync(int id);
    }
}
