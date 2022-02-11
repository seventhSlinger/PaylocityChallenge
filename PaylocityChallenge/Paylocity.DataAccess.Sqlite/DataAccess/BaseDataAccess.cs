using Common.Configuration;
using Dapper;
using Microsoft.Data.Sqlite;
using Microsoft.Extensions.Options;
using Paylocity.Common.Interfaces;
using Paylocity.DataAccess.Sqlite.Interfaces;
using System.Collections.Generic;
using Z.Dapper.Plus;

namespace Paylocity.DataAccess.Sqlite.DataAccess
{
    internal abstract class BaseDataAccess<TModel> : IDataAccess<TModel>
         where TModel : class, IUniqueModel
    {
        private readonly string _tableName;
        private readonly string _connectionString;

        public BaseDataAccess(string tableName,
            IOptions<DatabaseConfig> config)
        {
            _tableName = tableName;
            _connectionString = config.Value.ConnectionString;
            DapperPlusManager.Entity<TModel>()
                .Identity(entity => entity.Id)
                .Table(tableName);
        }

        public virtual int Create(TModel model)
        {
            using var connection = new SqliteConnection(_connectionString);

            var models = new List<TModel> { model };
            connection.BulkInsert(models);

            return model.Id;
        }

        public virtual IEnumerable<TModel> List()
        {
            using var connection = new SqliteConnection(_connectionString);

            return connection.Query<TModel>($"SELECT * FROM {_tableName}");
        }
    }
}
