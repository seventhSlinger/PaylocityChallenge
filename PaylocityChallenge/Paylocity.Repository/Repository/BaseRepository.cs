using Paylocity.Common.Interfaces;
using Paylocity.DataAccess.Sqlite.Interfaces;
using Paylocity.Repository.Interfaces;
using System.Collections.Generic;

namespace Paylocity.Repository.Repository
{
    internal abstract class BaseRepository<TModel> : IRepository<TModel>
        where TModel : class, IUniqueModel
    {
        protected readonly IDataAccess<TModel> _dataAccess;

        public BaseRepository(IDataAccess<TModel> dataAccess)
        {
            _dataAccess = dataAccess;
        }

        public virtual int Create(TModel model)
        {
            return _dataAccess.Create(model);
        }

        public int Update(TModel model)
        {
            return _dataAccess.Update(model);
        }

        public void Delete(TModel model)
        {
            _dataAccess.Delete(model);
        }

        public virtual TModel Get(int id)
        {
            return _dataAccess.Get(id);
        }

        public virtual IEnumerable<TModel> List()
        {
            return _dataAccess.List();
        }
    }
}
