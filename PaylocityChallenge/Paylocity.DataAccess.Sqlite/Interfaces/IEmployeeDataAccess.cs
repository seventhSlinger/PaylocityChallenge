using Paylocity.Models.Models;
using System.Collections.Generic;

namespace Paylocity.DataAccess.Sqlite.Interfaces
{
    public interface IEmployeeDataAccess : IDataAccess<Employee>
    {
        IEnumerable<Employee> GetEmployeesForCompany(int companyId);
    }
}
