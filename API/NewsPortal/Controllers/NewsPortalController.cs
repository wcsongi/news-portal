using System;
using Microsoft.AspNetCore.Mvc;
using NewsPortal.Data;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NewsPortal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public abstract class NewsPortalController<TEntity, TRepository> : ControllerBase
        where TEntity : class, IEntity
        where TRepository : IRepository<TEntity>
    {
        private readonly TRepository _repository;

        protected NewsPortalController(TRepository repository)
        {
            _repository = repository;
        }


        // GET: api/[controller]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TEntity>>> Get()
        {
            try
            {
                return await _repository.GetAll();
            }
            catch (Exception)
            {
                return new JsonResult("Couldn't fetch results!");
            }
        }

        // GET: api/[controller]/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TEntity>> Get(int id)
        {
            var entity = await _repository.Get(id);
            if (entity == null)
            {
                return NotFound();
            }
            return entity;
        }

        // POST: api/[controller]
        [HttpPost]
        public async Task<ActionResult<TEntity>> Post(TEntity entity)
        {
            try
            {
                await _repository.Add(entity);

                return new JsonResult("Successful add!");
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // PUT: api/[controller]/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, TEntity entity)
        {
            if (id != entity.Id)
            {
                return BadRequest();
            }
            await _repository.Update(entity);

            return new JsonResult("Successful update!");
        }

        // DELETE: api/[controller]/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TEntity>> Delete(int id)
        {
            var entity = await _repository.Delete(id);
            if (entity == null)
            {
                return NotFound();
            }

            return new JsonResult("Successful remove!");
        }
    }
}