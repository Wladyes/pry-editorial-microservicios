using Microsoft.EntityFrameworkCore;
using PublicationsService.Models;

namespace PublicationsService.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Publication> Publications { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Publication>(entity =>
            {
                entity.ToTable("publications");
                entity.Property(e => e.Status)
                    .HasConversion<string>()
                    .HasMaxLength(50);
                entity.HasIndex(e => e.AuthorId);
                entity.HasIndex(e => e.Status);
            });
        }
    }
}
