using System.Linq;
using DEV_dashboard_2019.Models;
using DEV_dashboard_2019.DataBase;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace DEV_dashboard_2019.Controllers
{
    [ApiController]
    [Route("authorize")]
    [EnableCors("AllowMyOrigin")]
    public class AuthorizeController
    {
        private readonly ILogger<AuthorizeController> _logger;
        
        private readonly PostgresqlContext _db;
        
        public AuthorizeController(ILogger<AuthorizeController> logger)
        {
            _logger = logger;
            _db = new PostgresqlContext();
        }

        [HttpGet]
        public Response Get(string name)
        {
            var user = _db.users.SingleOrDefault(p => p.UserName == name);
            if (user == null)
            {
                return new Response
                    {
                        status = 403,
                        success = false
                    };
            }
            else
            {
                return new Response
                    {
                        status = 200,
                        success = true
                    };
            }
        }
    }
}