using DEV_dashboard_2019.Models;
using Microsoft.EntityFrameworkCore;

namespace DEV_dashboard_2019.PostgreSQL
{
    public class ServiceContext : DbContext
    {
        public DbSet<Service> services { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(@"User ID=admin;Password=admin;Server=db;Port=5432;Database=admin");
        }
    }
}