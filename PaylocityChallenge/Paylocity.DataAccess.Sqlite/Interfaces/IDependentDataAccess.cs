using Paylocity.Models.Models;
using System.Collections.Generic;

namespace Paylocity.DataAccess.Sqlite.Interfaces
{
    public interface IDependentDataAccess : IDataAccess<Dependent>
    {
        IEnumerable<Dependent> GetDependentsForEmployee(int employeeId);
    }
}
