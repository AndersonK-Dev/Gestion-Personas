using GestionPersonasAPI.Models;

namespace GestionPersonasAPI.Interfaces
{
    public interface IPersonaRepository
    {
        // Task para operaciones asíncronas - redimiento y escalabilidad
        Task<(IEnumerable<Persona> Personas, int TotalRegistros)> GetAllPagedAsync(int page, int pageSize, string search);
        Task<Persona?> GetByIdAsync(int id);
        Task<Persona> AddAsync(Persona persona);
        Task<bool> UpdateAsync(Persona persona);
        Task<bool> DeleteAsync(int id);

        // Evitar emails duplicados
        Task<bool> ExistsByEmailAsync(string email);
    }
}
