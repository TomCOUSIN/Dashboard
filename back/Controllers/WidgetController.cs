using DEV_dashboard_2019.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using DEV_dashboard_2019.DataBase;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DEV_dashboard_2019.Clients;
using DEV_dashboard_2019.Models;
using DEV_dashboard_2019.Models.Github;
using DEV_dashboard_2019.Models.Weather;
using Microsoft.EntityFrameworkCore;
using Refit;

namespace DEV_dashboard_2019.Controllers
{
    [ApiController]
    [Route("widgets")]
    [EnableCors("AllowMyOrigin")]
    public class WidgetsController : ControllerBase
    {
        private readonly WidgetConfiguration _widgetConfiguration;

        private readonly ILogger<ServiceController> _logger;
        
        private readonly PostgresqlContext _db;

        public WidgetsController(IOptions<PostgresConfiguration> postgresConfiguration, IOptions<WidgetConfiguration> widgetConfiguration, ILogger<ServiceController> logger)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _widgetConfiguration = widgetConfiguration.Value ?? throw new ArgumentNullException(nameof(widgetConfiguration));
            _db = new PostgresqlContext(postgresConfiguration);
        }
        
        [HttpGet]
        public IEnumerable<Widget> Get(string user)
        {
            if (string.IsNullOrEmpty(user))
            {
                var widgets = _db.Widgets.Where(p => p.User == "admin").OrderBy(p => p.Id);
                return widgets.ToList();
            }
            else
            {
                var widgets = _db.Widgets.Where(p => p.User == user).OrderBy(p => p.Id);
                return widgets.ToList();
            }
        }
        
        [HttpGet("github-user")]
        public async Task<ActionResult<GithubUser>> GetGithubUser(string user)
        {
            try
            {
                var gitHubApi = RestService.For<IGitHubClient>(_widgetConfiguration.GithubUrl);
                var githubUser = await gitHubApi.GetUserInfoAsync(user);
                return Ok(githubUser);
            }
            catch (ApiException exception) { return Problem(exception.Message); }
        }
        
        [HttpGet("github-repos")]
        public async Task<ActionResult<IEnumerable<GithubRepo>>> GetGithubRepos(string user)
        {
            try
            {
                var gitHubApi = RestService.For<IGitHubClient>(_widgetConfiguration.GithubUrl);
                var githubRepos = await gitHubApi.GetRepoAsync(user);
                return Ok(githubRepos);
            }
            catch (ApiException exception) { return Problem(exception.Message); }
        }
        
        [HttpGet("weather")]
        public async Task<ActionResult<WeatherInfo>> GetWeather(string cityName, string countryCode)
        {
            try
            {
                var openWeatherApi = RestService.For<IOpenWeatherClient>(_widgetConfiguration.OpenWeatherUrl);
                var weather = await openWeatherApi.GetWeatherAsync(cityName, countryCode);
                return Ok(weather);
            }
            catch (ApiException exception) { return Problem(exception.Message); }
        }
        
        [HttpPost]
        public ActionResult Post(Widget widget)
        {
            try
            {
                _db.Widgets.Add(widget);
                _db.SaveChanges();
                return Ok();
            }
            catch (DbUpdateException exception) { return Problem(exception.Message); }
        }

        [HttpDelete]
        public ActionResult Delete(string user, string widgetName)
        {
            var widget = _db.Widgets.SingleOrDefault(p => p.User == user && p.Name == widgetName);
            
            if (widget == null) return NotFound();
            _db.Widgets.Remove(widget);
            _db.SaveChanges();
            return NoContent();
        }
    }
}