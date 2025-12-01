using GestionPersonasAPI.DTOs;
using GestionPersonasAPI.Interfaces;
using GestionPersonasAPI.Models;

namespace GestionPersonasAPI.Services
{
    public class PersonaService : IPersonaService
    {
        private readonly IPersonaRepository _repository;
        public PersonaService(IPersonaRepository repository)
        {
            _repository = repository;
        }
        public async Task<PagedResultDto<PersonaDto>> GetAllPagedAsync(int page, int pageSize, string search)
        {
            var result = await _repository.GetAllPagedAsync(page, pageSize, search);

            var personDtos = result.Personas.Select(p => new PersonaDto
            {
                Id = p.Id,
                NombreCompleto = p.NombreCompleto,
                Email = p.Email,
                Edad = p.Edad,
                Direccion = p.Direccion,
                FechaCreacion = p.FechaCreacion
            });

            return new PagedResultDto<PersonaDto>
            {
                Items = personDtos,
                TotalCount = result.TotalRegistros,
                Page = page,
                PageSize = pageSize
            };
        }
        public async Task<PersonaDto?> GetByIdAsync(int id)
        {
            var persona = await _repository.GetByIdAsync(id);
            if (persona == null) return null;

            return new PersonaDto
            {
                Id = persona.Id,
                NombreCompleto = persona.NombreCompleto,
                Email = persona.Email,
                Edad = persona.Edad,
                Direccion = persona.Direccion,
                FechaCreacion = persona.FechaCreacion
            };
        }
        public async Task<PersonaDto> CreateAsync(PersonaCreateDto personaDto)
        {
            // VALIDACIÓN DE NEGOCIO: Verificar si el email ya existe
           // Esto cumple con el requerimiento de validaciones en servidor [cite: 41]
            if (await _repository.ExistsByEmailAsync(personaDto.Email))
            {
                throw new Exception("El correo electrónico ya está registrado.");
            }

            // Mapeo DTO -> Entidad
            var persona = new Persona
            {
                NombreCompleto = personaDto.NombreCompleto,
                Email = personaDto.Email,
                Edad = personaDto.Edad,
                Direccion = personaDto.Direccion,
                FechaCreacion = DateTime.Now
            };

            var nuevaPersona = await _repository.AddAsync(persona);

            // Retornamos el DTO resultante (con el ID generado)
            return new PersonaDto
            {
                Id = nuevaPersona.Id,
                NombreCompleto = nuevaPersona.NombreCompleto,
                Email = nuevaPersona.Email,
                Edad = nuevaPersona.Edad,
                Direccion = nuevaPersona.Direccion,
                FechaCreacion = nuevaPersona.FechaCreacion
            };
        }

        public async Task<bool> UpdateAsync(int id, PersonaCreateDto personaDto)
        {
            // Primero verificamos si existe la persona a editar
            var personaExistente = await _repository.GetByIdAsync(id);
            if (personaExistente == null) return false;

            // Validación: Si cambia el email, verificar que el nuevo no pertenezca a otro usuario
            if (personaExistente.Email != personaDto.Email)
            {
                if (await _repository.ExistsByEmailAsync(personaDto.Email))
                {
                    throw new Exception("El correo electrónico ya está en uso por otro usuario.");
                }
            }

            // Actualizamos campos
            personaExistente.NombreCompleto = personaDto.NombreCompleto;
            personaExistente.Email = personaDto.Email;
            personaExistente.Edad = personaDto.Edad;
            personaExistente.Direccion = personaDto.Direccion;

            return await _repository.UpdateAsync(personaExistente);
        }
        public async Task<bool> DeleteAsync(int id)
        {
            return await _repository.DeleteAsync(id);
        }
    }
}
