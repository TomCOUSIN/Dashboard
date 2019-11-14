using System.Threading.Tasks;
using DEV_dashboard_2019.Models.Weather;
using Refit;

namespace DEV_dashboard_2019.Clients
{
    public interface IOpenWeatherClient
    {
        [Get("/weather?q={city_name},{country_code}&APPID=658007f8c22a3cb7be4174dd208ecbdd")]
        [Headers("User-Agent: request")]
        Task<WeatherInfo> GetWeatherAsync(string city_name, string country_code);
    }
}