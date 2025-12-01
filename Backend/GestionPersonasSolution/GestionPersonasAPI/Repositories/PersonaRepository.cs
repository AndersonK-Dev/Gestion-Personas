using Microsoft.EntityFrameworkCore;
using GestionPersonasAPI.Data;
using GestionPersonasAPI.Interfaces;
using GestionPersonasAPI.Models;

namespace GestionPersonasAPI.Repositories
{
    public class PersonaRepository : IPersonaRepository
    {
        private readonly ApplicationDbContext _context;

        // Contenido del DBcontext
        public PersonaRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<(IEnumerable<Persona> Personas, int TotalRegistros)> GetAllPagedAsync(int page, int pageSize, string search)
        {
            var query = _context.Personas.AsQueryable();

            // 1. Filtrado (Búsqueda)
            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(p => p.NombreCompleto.Contains(search) || p.Email.Contains(search));
            }

            // 2. Conteo total (necesario para el paginador del frontend)
            var totalRegistros = await query.CountAsync();

            // 3. Paginación (Skip y Take)
            var personas = await query
                .OrderByDescending(p => p.Id) // Ordenar por más reciente
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return (personas, totalRegistros);
        }

        public async Task<Persona?> GetByIdAsync(int id)
        {
            return await _context.Personas.FindAsync(id);
        }
        public async Task<Persona> AddAsync(Persona persona)
        {
            _context.Personas.Add(persona);
            await _context.SaveChangesAsync();
            return persona;
        }
        public async Task<bool> UpdateAsync(Persona persona)
        {
            // Verificamos si existe
            var existingPersona = await _context.Personas.FindAsync(persona.Id);
            if (existingPersona == null) return false;

            // Actualizamos los campos
            existingPersona.NombreCompleto = persona.NombreCompleto;
            existingPersona.Email = persona.Email;
            existingPersona.Edad = persona.Edad;
            existingPersona.Direccion = persona.Direccion;

            // No actualizamos FechaCreacion para mantener la integridad histórica

            _context.Personas.Update(existingPersona);
            return await _context.SaveChangesAsync() > 0;
        }
        public async Task<bool> DeleteAsync(int id)
        {
            var persona = await _context.Personas.FindAsync(id);
            if (persona == null) return false;

            _context.Personas.Remove(persona);
            return await _context.SaveChangesAsync() > 0;
        }
        public async Task<bool> ExistsByEmailAsync(string email)
        {
            return await _context.Personas.AnyAsync(p => p.Email == email);
        }
    }
}
