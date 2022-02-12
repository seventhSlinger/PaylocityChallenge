using Paylocity.DataAccess.Sqlite.Interfaces;
using Paylocity.Models.Models;
using Paylocity.Repository.Interfaces;
using System.Collections.Generic;

namespace Paylocity.Repository.Repository
{
    internal class DependentRepository : BaseRepository<Dependent>, IDependentRepository
    {
        private readonly IDependentDataAccess _dependentDataAccess;

        public DependentRepository(IDependentDataAccess dataAccess) : base(dataAccess)
        {
            _dependentDataAccess = dataAccess;
        }

        public IEnumerable<Dependent> GetDependentsForEmployee(int employeeId)
        {
            return _dependentDataAccess.GetDependentsForEmployee(employeeId);
        }
    }
}
