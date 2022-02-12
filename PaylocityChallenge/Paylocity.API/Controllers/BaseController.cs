using Microsoft.AspNetCore.Mvc;
using Paylocity.Common.Interfaces;
using Paylocity.Repository.Interfaces;
using System.Net;

namespace Paylocity.API.Controllers
{
    public class BaseController<TModel> : Controller
        where TModel : class, IUniqueModel
    {
        protected readonly IRepository<TModel> _repository;

        public BaseController(IRepository<TModel> repository)
        {
            _repository = repository;
        }

        [HttpPost("")]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public IActionResult Create([FromBody] TModel model)
        {
            if (model == null)
            {
                return BadRequest();
            }
            _ = _repository.Create(model);

            return StatusCode(((int)HttpStatusCode.Created));
        }

        [HttpPut("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public IActionResult Update([FromBody] TModel model)
        {
            if (model == null)
            {
                return BadRequest();
            }

            var existingModel = _repository.Get(model.Id);
            if (existingModel == null)
            {
                return NotFound();
            }

            _ = _repository.Update(model);

            return NoContent();
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult Delete([FromRoute] int id)
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
        public IActionResult Get([FromRoute] int id)
        {
            var model = _repository.Get(id);

            return model != null ? Ok(model) : NotFound();
        }

        [HttpGet("")]
        [ProducesResponseType(200)]
        public virtual IActionResult List() => Ok(_repository.List());
    }
}
