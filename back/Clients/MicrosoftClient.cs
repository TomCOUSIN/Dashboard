using System.Threading.Tasks;
using DEV_dashboard_2019.Models.Microsoft;
using Refit;

namespace DEV_dashboard_2019.Clients
{
    public interface IMicrosoftClient
    {
        [Get("/me/messages")]
        [Headers("Authorization: Bearer")]
        Task<MailInfo> GetMailAsync();
    }
}