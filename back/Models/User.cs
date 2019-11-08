using System.ComponentModel.DataAnnotations.Schema;

namespace DEV_dashboard_2019.Models
{
    [Table("users")]
    public class User
    {
        [Column("id")]
        public int Id { get; set; }

        [Column("username")]
        public string UserName { get; set; }
        
        [Column("code")]
        public string Code { get; set; }
    }
}