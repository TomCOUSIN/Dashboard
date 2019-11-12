using DEV_dashboard_2019.PostgreSQL;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using DEV_dashboard_2019.Models;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.AspNetCore.Cors;

namespace DEV_dashboard_2019.Controllers
{
    [ApiController]
    [Route("services")]
    [EnableCors("AllowMyOrigin")]
    public class ServiceController : ControllerBase
    {
        private readonly ILogger<ServiceController> _logger;
        
        private readonly ServiceContext _db;

        public ServiceController(ILogger<ServiceController> logger)
        {
            _logger = logger;
            _db = new ServiceContext();
        }

        [HttpGet]
        public IEnumerable<Service> Get(string user)
        {
            if (string.IsNullOrEmpty(user))
            {
                var services = _db.services.Where(p => p.User == "admin").OrderBy(p => p.Id);
                return services.ToList();
            }
            else
            {
                var services = _db.services.Where(p => p.User == user).OrderBy(p => p.Id);
                return services.ToList();
            }
        }

        [HttpPost]
        public Response Post(Service service)
        {
            _db.Add(service);
            _db.SaveChanges();
            return new Response
            {
                status = 200,
                success = true
            };
        }
        
        [HttpDelete]
        public Response Delete(string user, string service_name)
        {
            var service = _db.services.SingleOrDefault(p => p.User == user && p.Name == service_name);
            int status = 404;

            if (service != null)
            {
                _db.services.Remove(service);
                _db.SaveChanges();
                status = 200;
            }
            return new Response
            {
                status = status,
                success = status == 200 ? true : false
            };
        }
    }
}