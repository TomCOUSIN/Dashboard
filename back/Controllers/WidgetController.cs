using System.Collections.Generic;
using System.Linq;
using DEV_dashboard_2019.Models;
using DEV_dashboard_2019.PostgreSQL;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace DEV_dashboard_2019.Controllers
{
    [ApiController]
    [Route("widgets")]
    
    [EnableCors("AllowMyOrigin")]
    public class WidgetController
    {
        private readonly ILogger<WidgetController> _logger;
        
        private readonly WidgetContext _db;
        
        public WidgetController(ILogger<WidgetController> logger)
        {
            _logger = logger;
            _db = new WidgetContext();
        }

        [HttpGet]
        public IEnumerable<Widget> Get(string user)
        {
            if (string.IsNullOrEmpty(user))
            {
                var widgets = _db.widgets.Where(p => p.User == "admin").OrderBy(p => p.Id);
                return widgets.ToList();
            }
            else
            {
                var widgets = _db.widgets.Where(p => p.User == user).OrderBy(p => p.Id);
                return widgets.ToList();
            }
        }

        [HttpPost]
        public Response Post(Widget widget)
        {
            _db.Add(widget);
            _db.SaveChanges();
            return new Response
            {
                status = 200,
                success = true
            };
        }
        
        [HttpDelete]
        public Response Delete(string user, string widgetName)
        {
            var service = _db.widgets.SingleOrDefault(p => p.User == user && p.Name == widgetName);
            int status = 404;

            if (service != null)
            {
                _db.widgets.Remove(service);
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