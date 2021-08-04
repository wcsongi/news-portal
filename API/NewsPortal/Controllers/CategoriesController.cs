using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NewsPortal.Data.EFCore;
using NewsPortal.Models;

namespace NewsPortal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : NewsPortalController<Category, EfCoreCategoryRepository>
    {
        private readonly EfCoreCategoryRepository _repository;
        public CategoriesController(EfCoreCategoryRepository repository) : base(repository)
        {
            _repository = repository;
        }

        // POST: api/[controller]/CurrentNumber
        [Route("CurrentNumber")]
        [HttpPost]
        public int CurrentNumber(ResultItem resultItem)
        {
            return _repository.CurrentNumber(resultItem.SearchTerm);
        }

        // POST: api/[controller]/Results
        [Route("Results")]
        [HttpPost]
        public async Task<ActionResult<IEnumerable<Category>>> Results(ResultItem resultItem)
        {
            try
            {
                return await _repository.Results(resultItem);
            }
            catch (Exception)
            {
                return new JsonResult("Couldn't fetch results!");
            }
        }
    }
}
