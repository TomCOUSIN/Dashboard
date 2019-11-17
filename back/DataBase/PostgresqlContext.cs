using DEV_dashboard_2019.Configuration;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using DEV_dashboard_2019.Models;
using System;

namespace DEV_dashboard_2019.DataBase
{
    public class PostgresqlContext : DbContext
    {
        private readonly PostgresConfiguration _configuration;
        public DbSet<Service> Services { get; set; }

        public DbSet<Widget> Widgets { get; set; }

        public PostgresqlContext(IOptions<PostgresConfiguration> configuraton)
        {
            _configuration = configuraton.Value ?? throw new ArgumentNullException(nameof(configuraton));
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(_configuration.PostgresConnectionString);
        }
    }
}