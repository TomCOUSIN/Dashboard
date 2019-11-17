using DEV_dashboard_2019.Models;
using Microsoft.EntityFrameworkCore;

namespace DEV_dashboard_2019.DataBase
{
    public class PostgresqlContext : DbContext
    {
        public DbSet<Service> services { get; set; }
        
        public DbSet<User> users { get; set; }

        public DbSet<Widget> widgets { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(@"User ID=admin;Password=admin;Server=db;Port=5432;Database=admin");
        }
    }
}