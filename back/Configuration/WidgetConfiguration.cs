using Microsoft.Extensions.Options;
using System;

namespace DEV_dashboard_2019.Configuration
{
    public class WidgetConfiguration : IOptions<WidgetConfiguration>, IConfigureOptions<WidgetConfiguration>
    {
        public string GithubUrl { get; set; }
        
        public string OpenWeatherUrl { get; set; }
        
        public string MicrosoftMailUrl { get; set; }
        
        public WidgetConfiguration Value => this;
        
        public void Configure(WidgetConfiguration options)
        {
            GithubUrl = options.GithubUrl ?? throw new ArgumentNullException(nameof(options));
            OpenWeatherUrl = options.OpenWeatherUrl ?? throw new ArgumentNullException(nameof(options));
            MicrosoftMailUrl = options.MicrosoftMailUrl ?? throw new ArgumentNullException(nameof(options));
        }
    }
}