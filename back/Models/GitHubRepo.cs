using Newtonsoft.Json;

namespace DEV_dashboard_2019.Models
{
    public class GitHubRepo
    {
        [JsonProperty("name")]
        public string Name { get; set; }
        
        [JsonProperty("description")]
        public string Description { get; set; }
    }
}