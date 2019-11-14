using System.Threading.Tasks;
using DEV_dashboard_2019.Models.Github;
using Refit;

namespace DEV_dashboard_2019.Clients
{
    public interface IGitHubClient
    {
        [Get("/users/{user_name}/repos")]
        [Headers("User-Agent: request")]
        Task<GithubRepo[]> GetRepoAsync(string user_name);
        
        [Get("/users/{user_name}")]
        [Headers("User-Agent: request")]
        Task<GithubUser> GetUserInfoAsync(string user_name);
    }
}