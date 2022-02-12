using Paylocity.DataAccess.Sqlite.Interfaces;
using Paylocity.Models.Models;
using Paylocity.Repository.Interfaces;
using System.Collections.Generic;

namespace Paylocity.Repository.Repository
{
    internal class EmployeeRepository : BaseRepository<Employee>, IEmployeeRepository
    {
        private readonly IEmployeeDataAccess _employeeDataAccess;

        public EmployeeRepository(IEmployeeDataAccess dataAccess) : base(dataAccess)
        {
            _employeeDataAccess = dataAccess;
        }

        public IEnumerable<Employee> GetEmployeesForCompany(int companyId)
        {
            return _employeeDataAccess.GetEmployeesForCompany(companyId);
        }
    }
}
