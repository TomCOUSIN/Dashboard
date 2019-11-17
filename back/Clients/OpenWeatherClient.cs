using System.Threading.Tasks;
using DEV_dashboard_2019.Models.Weather;
using Refit;

namespace DEV_dashboard_2019.Clients
{
    public interface IOpenWeatherClient
    {
        [Get("/weather?q={cityName},{countryCode}&APPID=658007f8c22a3cb7be4174dd208ecbdd")]
        [Headers("User-Agent: request")]
        Task<WeatherInfo> GetWeatherAsync(string cityName, string countryCode);
    }
}