using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace LibraryManagement.Models
{
    public class ManagerContext : DbContext
    {
        public ManagerContext(DbContextOptions options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>(entity => {
                entity.HasKey(e => e.UserID);
            });
            modelBuilder.Entity<Book>(entity => {
                entity.HasKey(e => e.BookId);
                entity.HasOne(d => d.user).WithMany(u => u.Books);
            });

        }
        public DbSet<Book> Books { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
