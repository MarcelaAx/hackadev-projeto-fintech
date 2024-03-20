using Microsoft.EntityFrameworkCore;
using Troppers.Capibank.Data.Context;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

var conexao = builder.Configuration.GetConnectionString("SQLite");
builder.Services.AddDbContext<CapibankContext>(context => context.UseSqlite(conexao));

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var defaultConnectionString = builder.Configuration.GetConnectionString("DefaultConnection")
builder.Services.AddDbContext<AppDbContext>(options => {
    options.UseSqlite(defaultConnectionString);
})

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();