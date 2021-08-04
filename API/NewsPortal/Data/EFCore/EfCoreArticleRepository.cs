using Microsoft.EntityFrameworkCore;
using NewsPortal.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NewsPortal.Data.EFCore
{
    public class EfCoreArticleRepository : EfCoreRepository<Article, NewsPortalContext>
    {
        private readonly NewsPortalContext _context;

        public EfCoreArticleRepository(NewsPortalContext context) : base(context)
        {
            _context = context;
        }

        public int CurrentNumber(string searchTerm)
        {
            return _context.Article.Count(c => c.Title.Contains(searchTerm) || c.Description.Contains(searchTerm));
        }

        public async Task<List<Article>> Results(ResultItem resultItem)
        {
            IQueryable<Article> entitySet = _context.Set<Article>();

            if (!string.IsNullOrEmpty(resultItem.SearchTerm))
            {
                entitySet = entitySet.Where(c => c.Title.Contains(resultItem.SearchTerm) || c.Description.Contains(resultItem.SearchTerm));
            }

            return await entitySet.OrderByDescending(c => c.CreatedDateTime).Skip((resultItem.PageIndex - 1) * resultItem.PageSize).Take(resultItem.PageSize).ToListAsync();
        }
    }
}