using System.Collections.Generic;
using Newtonsoft.Json;

namespace DEV_dashboard_2019.Models.Weather
{
    public class WeatherInfo
    {
        [JsonProperty("main")]
        public Data Data { get; set; }
        
        [JsonProperty("weather")]
        public IEnumerable<Weather> Weather { get; set; }
    }

    public class Data
    {
        [JsonProperty("temp")]
        public string Temperature { get; set; }
        
        [JsonProperty("pressure")]
        public string Pressure { get; set; }
        
        [JsonProperty("humidity")]
        public string Humidity { get; set; }
    }

    public class Weather
    {
        [JsonProperty("main")]
        public string Main { get; set; }
    }
}