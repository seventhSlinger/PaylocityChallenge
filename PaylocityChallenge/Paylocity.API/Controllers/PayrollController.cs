using Microsoft.AspNetCore.Mvc;
using Paylocity.Models.Models;
using Paylocity.Repository.Interfaces;

namespace Paylocity.API.Controllers
{
    [Route("/payroll")]
    public class PayrollController : BaseController<Payroll>
    {
        public PayrollController(IRepository<Payroll> repository) : base(repository)
        { }
    }
}
