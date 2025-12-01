using GestionPersonasAPI.DTOs;

namespace GestionPersonasAPI.Interfaces
{
    public interface IExternalUserService
    {
        Task<IEnumerable<ExternalUserDto>> GetExternalUsersAsync();
    }
}
