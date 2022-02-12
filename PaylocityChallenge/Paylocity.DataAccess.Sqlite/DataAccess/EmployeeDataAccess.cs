using Common.Configuration;
using Dapper;
using Microsoft.Data.Sqlite;
using Microsoft.Extensions.Options;
using Paylocity.DataAccess.Sqlite.Interfaces;
using Paylocity.Models.Models;
using System.Collections.Generic;

namespace Paylocity.DataAccess.Sqlite.DataAccess
{
    internal class EmployeeDataAccess : BaseDataAccess<Employee>, IEmployeeDataAccess
    {
        public EmployeeDataAccess(IOptions<DatabaseConfig> config) : base("tblEmployee", config)
        { }

        public IEnumerable<Employee> GetEmployeesForCompany(int companyId)
        {
            using var connection = new SqliteConnection(_connectionString);

            var models = connection.Query<Employee>($"SELECT * FROM {_tableName} WHERE {nameof(Employee.CompanyId)} = @CompanyId", new { CompanyId = companyId });

            return models;
        }
    }
}
