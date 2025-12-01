
using GestionPersonasAPI.Data;
using GestionPersonasAPI.Interfaces;   
using GestionPersonasAPI.Repositories;
using GestionPersonasAPI.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// --- CONFIGURACIÓN DB ---
// Leemos la cadena de conexión del appsettings.json
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// Registramos el DbContext usando SQL Server
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));
// --- FIN CONFIGURACIÓN DB ---

// --- REGISTRO DE REPOSITORIOS ---
builder.Services.AddScoped<IPersonaRepository, PersonaRepository>();

// --- REGISTRO DE SERVICIOS ---
builder.Services.AddScoped<IPersonaService, PersonaService>();

// --- REGISTRO SERVICIO EXTERNO (HTTP CLIENT) ---
// URL Base
builder.Services.AddHttpClient<IExternalUserService, ExternalUserService>(client =>
{
    client.BaseAddress = new Uri("https://gorest.co.in/public/v2/");
    client.Timeout = TimeSpan.FromSeconds(10); // Timeout de seguridad
});

// 1. Agregar servicio CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173") // La URL de tu Frontend (Vite suele usar 5173)
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});
// --- INICIO CONFIGURACIÓN JWT ---
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});


// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowReactApp");

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
