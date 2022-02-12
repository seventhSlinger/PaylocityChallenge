using Common.Configuration;
using Dapper;
using Microsoft.Data.Sqlite;
using Microsoft.Extensions.Options;
using Paylocity.DataAccess.Sqlite.Interfaces;
using Paylocity.Models.Models;
using System.Collections.Generic;

namespace Paylocity.DataAccess.Sqlite.DataAccess
{
    internal class DependentDataAccess : BaseDataAccess<Dependent>, IDependentDataAccess
    {
        public DependentDataAccess(IOptions<DatabaseConfig> config) : base("tblDependent", config)
        { }

        public IEnumerable<Dependent> GetDependentsForEmployee(int employeeId)
        {
            using var connection = new SqliteConnection(_connectionString);

            var models = connection.Query<Dependent>($"SELECT * FROM {_tableName} WHERE {nameof(Dependent.EmployeeId)} = @EmployeeId", new { EmployeeId = employeeId });

            return models;
        }

        public IEnumerable<Dependent> GetDependentsForEmployees(IEnumerable<int> employeeIds)
        {
            using var connection = new SqliteConnection(_connectionString);
            var idString = string.Join(',', employeeIds);
            if (string.IsNullOrEmpty(idString))
                idString = "0";

            var models = connection.Query<Dependent>($"SELECT * FROM {_tableName} WHERE {nameof(Dependent.EmployeeId)} IN ({idString})");

            return models;
        }
    }
}
