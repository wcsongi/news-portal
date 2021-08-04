using Microsoft.EntityFrameworkCore;

namespace NewsPortal.Data.EFCore
{
    public class NewsPortalContext : DbContext
    {
        public NewsPortalContext(DbContextOptions<NewsPortalContext> options)
            : base(options)
        {
        }

        public DbSet<Models.Category> Category { get; set; }

        public DbSet<Models.Article> Article { get; set; }
    }
}
