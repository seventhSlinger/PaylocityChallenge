using Paylocity.Models.Models;
using System.Collections.Generic;

namespace Paylocity.Repository.Interfaces
{
    public interface IEmployeeRepository : IRepository<Employee>
    {
        IEnumerable<Employee> GetEmployeesForCompany(int companyId);
    }
}
