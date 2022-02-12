using Microsoft.AspNetCore.Mvc;
using Paylocity.Models.Models;
using Paylocity.Repository.Interfaces;

namespace Paylocity.API.Controllers
{
    [Route("/benefit")]
    public class BenefitController : BaseController<Benefit>
    {
        public BenefitController(IRepository<Benefit> repository) : base(repository)
        { }
    }
}
