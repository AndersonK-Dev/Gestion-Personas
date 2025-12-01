using Microsoft.AspNetCore.Mvc;
using GestionPersonasAPI.Interfaces;

namespace GestionPersonasAPI.Controllers
{
    [Route("api/external-users")]
    [ApiController]
    public class ExternalUsersController : ControllerBase
    {
        private readonly IExternalUserService _externalUserService;
        public ExternalUsersController(IExternalUserService externalUserService)
        {
            _externalUserService = externalUserService;
        }
        [HttpGet]
        public async Task<IActionResult> GetExternalUsers()
        {
            var users = await _externalUserService.GetExternalUsersAsync();

            // Si la lista está vacía (posible error manejado en servicio), 
            // igual retornamos 200 OK con array vacío, o podríamos retornar un mensaje extra.
            return Ok(users);
        }
    }
}
