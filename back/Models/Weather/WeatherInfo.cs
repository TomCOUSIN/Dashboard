using Newtonsoft.Json;

namespace DEV_dashboard_2019.Models.Weather
{
    public class WeatherInfo
    {
        [JsonProperty("main")]
        public Data Data { get; set; }
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
}