using DEV_dashboard_2019.Configuration;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using DEV_dashboard_2019.DataBase;
using System.Collections.Generic;
using DEV_dashboard_2019.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System;

namespace DEV_dashboard_2019.Controllers
{
    [ApiController]
    [Route("services")]
    [EnableCors("AllowMyOrigin")]
    public class ServiceController : ControllerBase
    {
        private readonly ILogger<ServiceController> _logger;
        
        private readonly PostgresqlContext _db;

        public ServiceController(IOptions<PostgresConfiguration> postgresConfiguration, ILogger<ServiceController> logger)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _db = new PostgresqlContext(postgresConfiguration);
        }

        [HttpGet]
        public ActionResult<IEnumerable<Service>> Get(string user)
        {
            if (string.IsNullOrEmpty(user))
            {
                var services = _db.Services.Where(p => p.User == "admin").OrderBy(p => p.Id);
                return Ok(services.ToList());
            }
            else
            {
                var services = _db.Services.Where(p => p.User == user).OrderBy(p => p.Id);
                return Ok(services.ToList());
            }
        }

        [HttpPost]
        public ActionResult Post(Service service)
        {
            try
            {
                _db.Services.Add(service);
                _db.SaveChanges();
                return Ok(service);
            }
            catch (DbUpdateException exception) { return Problem(exception.Message); }
        }
        
        [HttpDelete]
        public ActionResult Delete(string user, string serviceName)
        {
            var service = _db.Services.SingleOrDefault(p => p.User == user && p.Name == serviceName);

            if (service == null) return NotFound();
            _db.Services.Remove(service);
            _db.SaveChanges();
            return NoContent();
        }
    }
}