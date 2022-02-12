using Microsoft.AspNetCore.Mvc;
using Paylocity.Models.Models;
using Paylocity.Repository.Interfaces;

namespace Paylocity.API.Controllers
{
    [Route("/employee")]
    public class EmployeeController : BaseController<Employee>
    {
        private readonly IEmployeeRepository _employeeRepository;

        public EmployeeController(IEmployeeRepository repository) : base(repository)
        {
            _employeeRepository = repository;
        }

        [HttpGet("company/{companyId}")]
        [ProducesResponseType(200)]
        public virtual IActionResult GetEmployeesForCompany([FromRoute] int companyId) => Ok(_employeeRepository.GetEmployeesForCompany(companyId));
    }
}
