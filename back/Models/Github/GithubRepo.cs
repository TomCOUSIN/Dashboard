using Newtonsoft.Json;

namespace DEV_dashboard_2019.Models.Github
{
    public class GithubRepo
    {
        [JsonProperty("name")]
        public string Name { get; set; }
        
        [JsonProperty("description")]
        public string Description { get; set; }
    }
}