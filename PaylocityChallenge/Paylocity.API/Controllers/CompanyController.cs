using Microsoft.AspNetCore.Mvc;
using Paylocity.Business.Interfaces;
using Paylocity.Models.Models;
using Paylocity.Repository.Interfaces;

namespace Paylocity.API.Controllers
{
    [Route("/company")]
    public class CompanyController : BaseController<Company>
    {
        private readonly IPayrollService _payrollService;

        public CompanyController(IRepository<Company> repository,
            IPayrollService payrollService) : base(repository)
        {
            _payrollService = payrollService;
        }

        [HttpGet("{companyId}/payroll")]
        [ProducesResponseType(200)]
        public IActionResult Create([FromRoute] int companyId)
        {
            var payrollSummary = _payrollService.GetYearlyPayrollPreviewForCompany(companyId);
            
            return Ok(payrollSummary);
        }
    }
}
