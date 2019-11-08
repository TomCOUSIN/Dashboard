using System;
using Microsoft.Extensions.Logging;
using DEV_dashboard_2019.Models;
using Microsoft.AspNetCore.Mvc;

namespace DEV_dashboard_2019.Controllers
{
    [ApiController]
    [Route("services")]
    public class ServiceController : ControllerBase
    {
        private readonly ILogger<ServiceController> _logger;

        public ServiceController(ILogger<ServiceController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public Service Get()
        {
            //call DataBase to get Services and Widgets from user
            return new Service
            {
                BaseUrl = "/",
                Credential = "Tom",
                Name = "Weather",

            };
        }
    }
}