using Microsoft.Extensions.Options;
using System;

namespace DEV_dashboard_2019.Configuration
{
    public class PostgresConfiguration : IOptions<PostgresConfiguration>, IConfigureOptions<PostgresConfiguration>
    {
        public string PostgresConnectionString { get; set; }

        public PostgresConfiguration Value => this;

        public void Configure(PostgresConfiguration options)
        {
            PostgresConnectionString = options.PostgresConnectionString ?? throw new ArgumentNullException(nameof(options));
        }
    }
}