using Microsoft.EntityFrameworkCore;
using System.Reflection;
using Troopers.Capibank.Repositories;
using Troopers.Capibank.Services;
using Troppers.Capibank.Data.Context;

using Troopers.Capibank.Util.Validators;
using Troopers.Capibank.Services;
using Troopers.Capibank.Exceptions;
using Troopers.Capibank.Repositories;
using Troopers.Capibank.Domain.Entities;
using Troopers.Capibank.Mappers;
using Troopers.Capibank.DTO.User;
using Troopers.Capibank.DTO.Auth;

var builder = WebApplication.CreateBuilder(args);

// Add logging.
builder.Logging.ClearProviders();
builder.Logging.AddConsole();

// Add services to the container.
var conexao = builder.Configuration.GetConnectionString("SQLite");

builder.Services.AddDbContext<CapibankContext>(context => 
context.UseSqlite(conexao));

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddScoped<IContaCorrenteRepository, ContaCorrenteRepository>();
builder.Services.AddScoped<IContaCorrenteService, ContaCorrenteService>();
builder.Services.AddScoped<ITitularRepository, TitularRepository>();
builder.Services.AddScoped<ITitularService, TitularService>();


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    var xmlComentarios = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlComentariosPath = Path.Combine(AppContext.BaseDirectory, xmlComentarios);
    options.IncludeXmlComments(xmlComentariosPath);
});

builder.Services.AddCors(option =>
{
    option.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});

builder.Services.AddExceptionHandler<InvalidPasswordExceptionHandler>();

var app = builder.Build();
app.UseExceptionHandler(opt => {});

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors();
app.UseAuthorization();
app.MapControllers();
app.Run();
