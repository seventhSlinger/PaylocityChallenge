using Microsoft.AspNetCore.Mvc;
using Paylocity.Models.Models;
using Paylocity.Repository.Interfaces;

namespace Paylocity.API.Controllers
{
    [Route("/employee")]
    public class EmployeeController : BaseController<Employee>
    {
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IDependentRepository _dependentRepository;

        public EmployeeController(IEmployeeRepository repository,
            IDependentRepository dependentRepository) : base(repository)
        {
            _employeeRepository = repository;
            _dependentRepository = dependentRepository;
        }

        [HttpGet("company/{companyId}")]
        [ProducesResponseType(200)]
        public virtual IActionResult GetEmployeesForCompany([FromRoute] int companyId) => Ok(_employeeRepository.GetEmployeesForCompany(companyId));

        [HttpDelete("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public override IActionResult Delete([FromRoute] int id)
        {
            var dependents = _dependentRepository.GetDependentsForEmployee(id);

            return (dependents?.Any() ?? false) ? BadRequest(new { Message = "Dependents for Employee must be deleted first." }) : base.Delete(id);
        }
    }
}
