using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using GestionPersonasAPI.DTOs;
using GestionPersonasAPI.Interfaces;
using Microsoft.AspNetCore.Authorization;


namespace GestionPersonasAPI.Controllers
{
    //Ruta "GET/persons"
    [Route("api/persons")]
    [ApiController]
    public class PersonasController : ControllerBase
    {
        private readonly IPersonaService _service;
        
        // Interfaz del servicio - controlador
        public PersonasController(IPersonaService service)
        {
            _service = service;
        }

        // 1. GET: api/persons
        // Lista todas las personas
        [HttpGet]
        public async Task<ActionResult<PagedResultDto<PersonaDto>>> GetAll(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10,
        [FromQuery] string search = "")
        {
            var result = await _service.GetAllPagedAsync(page, pageSize, search);
            return Ok(result);
        }

        // 2. GET: api/persons/{id}
        // Devuelve una persona específica
        [HttpGet("{id}")]
        public async Task<ActionResult<PersonaDto>> GetById(int id)
        {
            var persona = await _service.GetByIdAsync(id);

            if (persona == null)
            {
                return NotFound($"No se encontró la persona con ID {id}"); // Retorna 404
            }

            return Ok(persona);
        }

        // 3. POST: api/persons
        // Crea una nueva persona
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<PersonaDto>> Create([FromBody] PersonaCreateDto personaDto)
        {
            // Validamos el modelo (Data Annotations en el DTO)
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var nuevaPersona = await _service.CreateAsync(personaDto);

                // Retorna 201 Created y la URL para consultar el recurso creado
                return CreatedAtAction(nameof(GetById), new { id = nuevaPersona.Id }, nuevaPersona);
            }
            catch (Exception ex)
            {
                // Capturamos errores de negocio (ej. email duplicado)
                return BadRequest(ex.Message);
            }
        }

        // 4. PUT: api/persons/{id}
        // Actualiza una persona existente
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] PersonaCreateDto personaDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var resultado = await _service.UpdateAsync(id, personaDto);

                if (!resultado)
                {
                    return NotFound($"No se encontró la persona con ID {id} para actualizar.");
                }

                return NoContent(); // Retorna 204 No Content (Estándar para actualizaciones exitosas)
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // 5. DELETE: api/persons/{id}
        // Elimina una persona
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var resultado = await _service.DeleteAsync(id);

            if (!resultado)
            {
                return NotFound($"No se encontró la persona con ID {id} para eliminar.");
            }

            return NoContent(); // Retorna 204 No Content
        }

    }
}
