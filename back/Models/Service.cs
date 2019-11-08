using System.ComponentModel.DataAnnotations.Schema;

namespace DEV_dashboard_2019.Models
{
    [Table("services")]
    public class Service
    {
        [Column("id")]
        public int Id { get; set; }
        
        [Column("associated_user")]
        public string User { get; set; }

        [Column("name")]
        public string Name { get; set; }

        [Column("url")]
        public string BaseUrl { get; set; }
    }
}