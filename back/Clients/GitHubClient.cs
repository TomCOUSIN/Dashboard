using DEV_dashboard_2019.Models;
using System.Threading.Tasks;
using Refit;

namespace DEV_dashboard_2019.Clients
{
    public interface IGitHubClient
    {
        [Get("/users/{userName}/repos")]
        [Headers("User-Agent: request")]
        Task<GitHubRepo[]> GetRepoAsync(string userName);
    }
}