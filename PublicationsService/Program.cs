using Microsoft.EntityFrameworkCore;
using PublicationsService.Data;
using PublicationsService.Repositories;
using PublicationsService.Services;
using PublicationsService.Middleware;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Configurar CORS (ANTES de otros servicios)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(
            "http://localhost:3001",
            "http://192.168.56.1:3001",
            "http://localhost:3000"
        )
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials();
    });
});

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
});

builder.Services.AddHttpClient<IAuthorsClient, AuthorsClient>(client =>
{
    client.BaseAddress = new Uri("http://localhost:3000");
    client.Timeout = TimeSpan.FromSeconds(30);
});

builder.Services.AddScoped<IPublicationRepository, PublicationRepository>();
builder.Services.AddScoped<IPublicationService, PublicationService>();

var app = builder.Build();

app.UseMiddleware<ErrorHandlingMiddleware>();

// Usar CORS (ANTES de MapControllers)
app.UseCors("AllowFrontend");

app.UseSwagger();
app.UseSwaggerUI();
app.MapControllers();
app.Run();
