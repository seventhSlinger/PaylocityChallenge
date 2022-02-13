using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Paylocity.API.ViewModels;
using Paylocity.Models.Models;
using Paylocity.Repository.Interfaces;

namespace Paylocity.API.Controllers
{
    [Route("/benefit")]
    public class BenefitController : BaseController<BenefitViewModel, Benefit>
    {
        public BenefitController(IRepository<Benefit> repository, IMapper mapper) : base(repository, mapper)
        { }
    }
}
