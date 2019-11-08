using System.ComponentModel.DataAnnotations.Schema;

namespace DEV_dashboard_2019.Models
{
    [Table("widgets")]
    public class Widget
    {
        [Column("id")]
        public int Id { get; set; }

        [Column("associated_user")]
        public string User { get; set; }

        [Column("associated_service")]
        public string Service { get; set; }

        [Column("name")]
        public string Name { get; set; }
        
        [Column("url")]
        public string Url { get; set; }
        
        [Column("params")]
        public string[] Parameters { get; set; }
    }
}