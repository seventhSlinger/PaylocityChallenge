using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Paylocity.API.ViewModels;
using Paylocity.Models.Models;
using Paylocity.Repository.Interfaces;

namespace Paylocity.API.Controllers
{
    [Route("/dependent")]
    public class DependentController : BaseController<DependentViewModel, Dependent>
    {
        private readonly IDependentRepository _dependentRepository;

        public DependentController(IDependentRepository repository, IMapper mapper) : base(repository, mapper)
        {
            _dependentRepository = repository;
        }

        [HttpGet("employee/{employeeId}")]
        [ProducesResponseType(200)]
        public virtual IActionResult GetEmployeesForCompany([FromRoute] int employeeId) => Ok(_dependentRepository.GetDependentsForEmployee(employeeId));
    }
}
