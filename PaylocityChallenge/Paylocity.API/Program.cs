using Common.Configuration;
using Paylocity.Business.Interfaces;
using Paylocity.Business.Services;
using Paylocity.DataAccess.Sqlite.DataAccess;
using Paylocity.DataAccess.Sqlite.Interfaces;
using Paylocity.Models.Models;
using Paylocity.Repository.Interfaces;
using Paylocity.Repository.Repository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(c => { c.AddPolicy("AllowOrigin", options => options.AllowAnyOrigin()); });
builder.Services.Configure<DatabaseConfig>(builder.Configuration.GetSection("Database"));

builder.Services.AddScoped<IRepository<Company>, CompanyRepository>();
builder.Services.AddScoped<IRepository<Benefit>, BenefitRepository>();
builder.Services.AddScoped<IRepository<Payroll>, PayrollRepository>();
builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();
builder.Services.AddScoped<IDependentRepository, DependentRepository>();

builder.Services.AddScoped<IDataAccess<Company>, CompanyDataAccess>();
builder.Services.AddScoped<IDataAccess<Benefit>, BenefitDataAccess>();
builder.Services.AddScoped<IDataAccess<Payroll>, PayrollDataAccess>();
builder.Services.AddScoped<IEmployeeDataAccess, EmployeeDataAccess>();
builder.Services.AddScoped<IDependentDataAccess, DependentDataAccess>();

builder.Services.AddScoped<IPayrollService, PayrollService>();

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
app.UseCors(cors => cors.AllowAnyOrigin()
    .AllowAnyHeader()
    .AllowAnyMethod());
