using System.Threading.Tasks;
using DEV_dashboard_2019.Models.Github;
using Refit;

namespace DEV_dashboard_2019.Clients
{
    public interface IGitHubClient
    {
        [Get("/users/{userName}/repos")]
        [Headers("User-Agent: request")]
        Task<GithubRepo[]> GetRepoAsync(string userName);
        
        [Get("/users/{userName}")]
        [Headers("User-Agent: request")]
        Task<GithubUser> GetUserInfoAsync(string userName);
    }
}