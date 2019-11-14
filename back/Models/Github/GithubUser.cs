using Newtonsoft.Json;

namespace DEV_dashboard_2019.Models.Github
{
    public class GithubUser
    {
        [JsonProperty("login")]
        public string Login { get; set; }
        
        [JsonProperty("avatar_url")]
        public string Image { get; set; }
        
        [JsonProperty("bio")]
        public string Bio { get; set; }
        
        [JsonProperty("email")]
        public string Email { get; set; }
        
        [JsonProperty("public_repos")]
        public int ReposCount { get; set; }
        
        [JsonProperty("followers")]
        public int Followers { get; set; }
        
        [JsonProperty("following")]
        public int Following { get; set; }
    }
}