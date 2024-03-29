﻿using Paylocity.Common.Interfaces;
using System.Collections.Generic;

namespace Paylocity.Repository.Interfaces
{
    public interface IRepository<TModel> where TModel : IUniqueModel
    {
        int Create(TModel model);
        int Update(TModel model);
        void Delete(TModel model);
        TModel Get(int id);
        IEnumerable<TModel> List();
    }
}
