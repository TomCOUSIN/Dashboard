using System.Collections.Generic;

namespace DEV_dashboard_2019.Models
{
    public class About
    {
        public AboutClient Client { get; set; }
        
        public AboutServer Server { get; set; }
    }

    public class AboutClient
    {
        public string Host { get; set; }
    }
    
    public class AboutServer
    {
        public string Current_Time { get; set; }

        public IEnumerable<AboutService> Services { get; set; }
    }
    
    public class AboutService
    {
        public string Name { get; set; }
        
        public IEnumerable<AboutWidget> Widgets { get; set; }
        
    }
    
    public class AboutWidget
    {
        public string Name { get; set; }
        
        public string Description { get; set; }
        
        public IEnumerable<AboutParams> Params { get; set; }

    }

    public class AboutParams
    {
        public string Name { get; set; }
        
        public string Type { get; set; }
    }
}