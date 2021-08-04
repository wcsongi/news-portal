using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NewsPortal.Models;

namespace NewsPortal.Data.EFCore
{
    public class EfCoreCategoryRepository : EfCoreRepository<Category, NewsPortalContext>
    {
        private readonly NewsPortalContext _context;
        public EfCoreCategoryRepository(NewsPortalContext context) : base(context)
        {
            _context = context;
        }

        public int CurrentNumber(string searchTerm)
        {
            return _context.Category.Count(c => c.Name.Contains(searchTerm));
        }

        public async Task<List<Category>> Results(ResultItem resultItem)
        {
            IQueryable<Category> entitySet = _context.Set<Category>();

            if (!string.IsNullOrEmpty(resultItem.SearchTerm))
            {
                entitySet = entitySet.Where(c => c.Name.Contains(resultItem.SearchTerm));
            }

            return await entitySet.OrderByDescending(c => c.CreatedDateTime).Skip((resultItem.PageIndex - 1) * resultItem.PageSize).Take(resultItem.PageSize).ToListAsync();
        }
    }
}