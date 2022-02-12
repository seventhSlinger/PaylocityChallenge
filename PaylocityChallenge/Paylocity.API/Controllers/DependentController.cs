using Microsoft.AspNetCore.Mvc;
using Paylocity.Models.Models;
using Paylocity.Repository.Interfaces;

namespace Paylocity.API.Controllers
{
    [Route("/dependent")]
    public class DependentController : BaseController<Dependent>
    {
        private readonly IDependentRepository _dependentRepository;

        public DependentController(IDependentRepository repository) : base(repository)
        {
            _dependentRepository = repository;
        }

        [HttpGet("employee/{employeeId}")]
        [ProducesResponseType(200)]
        public virtual IActionResult GetEmployeesForCompany([FromRoute] int employeeId) => Ok(_dependentRepository.GetDependentsForEmployee(employeeId));
    }
}
