using System.ComponentModel.DataAnnotations.Schema;

namespace DEV_dashboard_2019.Models
{
    [Table("services")]
    public abstract class Service
    {
        [Column("id")]
        public int Id { get; set; }
        
        [Column("associated_user")]
        public string User { get; set; }

        [Column("name")]
        public string Name { get; set; }
        
        [Column("params")] 
        public string[] Params { get; set; }
    }
}