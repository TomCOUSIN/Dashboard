using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DEV_dashboard_2019.Clients;
using DEV_dashboard_2019.Models;
using DEV_dashboard_2019.Models.Github;
using DEV_dashboard_2019.Models.Weather;
using DEV_dashboard_2019.PostgreSQL;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Refit;

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
        
        [HttpGet("github-user")]
        public async Task<GithubUser> GetGithubUser(string user)
        {
            var gitHubApi = RestService.For<IGitHubClient>("https://api.github.com");
            return await gitHubApi.GetUserInfoAsync(user);
        }
        
        [HttpGet("github-repos")]
        public async Task<IEnumerable<GithubRepo>> GetGithubRepos(string user)
        {
            var gitHubApi = RestService.For<IGitHubClient>("https://api.github.com");
            return await gitHubApi.GetRepoAsync(user);
        }
        
        [HttpGet("weather")]
        public async Task<WeatherInfo> GetWeather(string city_name, string country_code)
        {
            var openWeatherApi = RestService.For<IOpenWeatherClient>("http://api.openweathermap.org/data/2.5");
            return await openWeatherApi.GetWeatherAsync(city_name, country_code);
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