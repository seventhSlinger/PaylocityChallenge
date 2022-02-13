using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Paylocity.Common.Interfaces;
using Paylocity.Repository.Interfaces;
using System.Net;

namespace Paylocity.API.Controllers
{
    public class BaseController<TViewModel, TModel> : Controller
        where TViewModel : class, IUniqueModel
        where TModel : class, IUniqueModel
    {
        protected readonly IRepository<TModel> _repository;
        protected readonly IMapper _mapper;

        public BaseController(IRepository<TModel> repository,
            IMapper mapper)
        {
            _repository = repository;
            _mapper  = mapper;
        }

        [HttpPost("")]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public virtual IActionResult Create([FromBody] TViewModel viewModel)
        {
            if (viewModel == null)
            {
                return BadRequest();
            }
            var model = _mapper.Map<TModel>(viewModel);
            _ = _repository.Create(model);

            return StatusCode(((int)HttpStatusCode.Created));
        }

        [HttpPut("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public virtual IActionResult Update([FromBody] TViewModel viewModel)
        {
            if (viewModel == null)
            {
                return BadRequest();
            }

            var existingModel = _repository.Get(viewModel.Id);
            if (existingModel == null)
            {
                return NotFound();
            }

            var model = _mapper.Map<TModel>(viewModel);
            _ = _repository.Update(model);

            return NoContent();
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public virtual IActionResult Delete([FromRoute] int id)
        {
            var existingModel = _repository.Get(id);
            if (existingModel == null)
            {
                return NotFound();
            }

            _repository.Delete(existingModel);

            return NoContent();
        }

        [HttpGet("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public virtual IActionResult Get([FromRoute] int id)
        {
            var model = _repository.Get(id);
            var viewModel = _mapper.Map<TViewModel>(model);

            return viewModel != null ? Ok(viewModel) : NotFound();
        }

        [HttpGet("")]
        [ProducesResponseType(200)]
        public virtual IActionResult List()
        {
            var models = _repository.List();
            var viewModels = _mapper.Map<IEnumerable<TViewModel>>(models);

            return Ok(viewModels);
        }
    }
}
