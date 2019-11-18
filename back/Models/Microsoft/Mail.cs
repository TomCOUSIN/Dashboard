using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace DEV_dashboard_2019.Models.Microsoft
{
    public class MailInfo
    {
        [JsonProperty("value")]
        public IEnumerable<Mail> MailList { get; set; }
    }

    public class Mail
    {
        [JsonProperty("subject")]
        public string Subject { get; set; }
        
        [JsonProperty("sender")]
        public MailUser From { get; set; }
        
        [JsonProperty("toRecipients")]
        public IEnumerable<MailUser> To { get; set; }
        
        [JsonProperty("receivedDateTime")]
        public DateTime Date { get; set; } 
    }

    public class MailUser
    {
        [JsonProperty("emailAddress")]
        public MailAddress userAddress { get; set; }
    }
    
    public class MailAddress
    {
        [JsonProperty("name")]
        public string Name { get; set; }
        
        [JsonProperty("address")]
        public string Address { get; set; }
    }
}