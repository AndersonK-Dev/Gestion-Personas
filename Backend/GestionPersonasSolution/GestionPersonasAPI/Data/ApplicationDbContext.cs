using Microsoft.EntityFrameworkCore;
using GestionPersonasAPI.Models;

namespace GestionPersonasAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }
        //Tabla sql server
        public DbSet<Persona> Personas { get; set; }
    }
}
