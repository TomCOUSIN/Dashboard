using System.Collections.Generic;
using System.Linq;
using DEV_dashboard_2019.Models;
using DEV_dashboard_2019.DataBase;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace DEV_dashboard_2019.Controllers
{
    [ApiController]
    [Route("users")]
    [EnableCors("AllowMyOrigin")]
    public class UserController
    {
        private readonly ILogger<UserController> _logger;

        private readonly PostgresqlContext _db;
        
        public UserController(ILogger<UserController> logger)
        {
            _logger = logger;
            _db = new PostgresqlContext();
        }
        
        [HttpGet]
        public IEnumerable<User> Get()
        {
            var users = _db.users.OrderBy(p => p.Id);
            return users.ToList();
        }

        [HttpPost]
        public Response Post(User user)
        {
            _db.users.Add(user);
            _db.SaveChanges();
            return new Response
            {
                status = 200,
                success = true
            };
        }
        
        [HttpDelete]
        public Response Delete(string name)
        {
            var user = _db.users.SingleOrDefault(p => p.UserName == name);
            int status = 404;

            if (user != null)
            {
                _db.users.Remove(user);
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