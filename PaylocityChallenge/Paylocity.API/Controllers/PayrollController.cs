using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Paylocity.API.ViewModels;
using Paylocity.Models.Models;
using Paylocity.Repository.Interfaces;

namespace Paylocity.API.Controllers
{
    [Route("/payroll")]
    public class PayrollController : BaseController<PayrollViewModel, Payroll>
    {
        public PayrollController(IRepository<Payroll> repository, IMapper mapper) : base(repository, mapper)
        { }
    }
}
