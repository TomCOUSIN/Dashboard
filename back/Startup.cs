using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.Extensions.Configuration;
using DEV_dashboard_2019.Configuration;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using System;

namespace DEV_dashboard_2019
{
    public class Startup
    {
        private readonly IConfiguration _configuration;
        public Startup(IConfiguration configuration)
        {
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            
            services.AddCors(options =>
            {
                options.AddPolicy("AllowMyOrigin", builder => builder.WithOrigins("http://localhost:5000")
                    .AllowAnyHeader()
                    .AllowAnyMethod());
            });
            
            //Register the Swagger generator
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo{ Title = "DEV_dashboard_2019", Version = "v1"});
            });
            
            //Register Postgres Configuration
            services.Configure<PostgresConfiguration>(_configuration.GetSection("DataBaseSettings"));
            services.ConfigureOptions<PostgresConfiguration>();
            
            //Register Widget Configuration
            services.Configure<WidgetConfiguration>(_configuration.GetSection("WidgetsSettings"));
            services.ConfigureOptions<WidgetConfiguration>();
            
            //
            services.Configure<ForwardedHeadersOptions>(options =>
            {
                options.ForwardedHeaders = 
                    ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto | ForwardedHeaders.All;
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            
            app.UseForwardedHeaders();

            app.UseCors("AllowMyOrigin");

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
            
            //Enable middleware to serve generated swagger as a JSON endpoint.
            app.UseSwagger();
            
            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("swagger/v1/swagger.json", "DEV_dashboard_2019 v1");
                c.RoutePrefix = string.Empty;
            });
        }
    }
}
