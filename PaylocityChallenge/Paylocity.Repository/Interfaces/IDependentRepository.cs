using Paylocity.Models.Models;
using System.Collections.Generic;

namespace Paylocity.Repository.Interfaces
{
    public interface IDependentRepository : IRepository<Dependent>
    {
        IEnumerable<Dependent> GetDependentsForEmployee(int employeeId);
    }
}
