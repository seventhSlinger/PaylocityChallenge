using Paylocity.Common.Interfaces;
using System.Collections.Generic;

namespace Paylocity.DataAccess.Sqlite.Interfaces
{
    public interface IDataAccess<TModel> where TModel : class, IUniqueModel
    {
        int Create(TModel model);
        int Update(TModel model);
        TModel Get(int id);
        IEnumerable<TModel> List();
    }
}
