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
        protected readonly string _tableName;
        protected readonly string _connectionString;

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

        public virtual int Update(TModel model)
        {
            using var connection = new SqliteConnection(_connectionString);

            var models = new List<TModel> { model };
            connection.BulkUpdate(models);

            return model.Id;
        }

        public void Delete(TModel model)
        {
            using var connection = new SqliteConnection(_connectionString);

            var models = new List<TModel> { model };
            connection.BulkDelete(models);

            return;
        }

        public virtual TModel Get(int id)
        {
            using var connection = new SqliteConnection(_connectionString);

            var model = connection.QuerySingleOrDefault<TModel>($"SELECT * FROM {_tableName} WHERE {nameof(IUniqueModel.Id)} = @Id", new { Id = id });

            return model;
        }

        public virtual IEnumerable<TModel> List()
        {
            using var connection = new SqliteConnection(_connectionString);

            return connection.Query<TModel>($"SELECT * FROM {_tableName}");
        }
    }
}
