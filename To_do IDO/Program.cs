using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using To_do_IDO.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddDbContext<TaskContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("TaskCS")));

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

// Enable CORS (Cross-Origin Resource Sharing)
app.UseCors(policy =>
{
    policy.AllowAnyOrigin() // You can restrict origins here if needed
          .AllowAnyMethod()
          .AllowAnyHeader();
});

app.UseAuthorization();

app.MapControllers();

app.Run();
