using Microsoft.AspNetCore.Mvc;
using Paylocity.Models.Models;
using Paylocity.Repository.Interfaces;

namespace Paylocity.API.Controllers
{
    [Route("/company")]
    public class CompanyController : BaseController<Company>
    {
        public CompanyController(IRepository<Company> repository) : base(repository)
        { }
    }
}
