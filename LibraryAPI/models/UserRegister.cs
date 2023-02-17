using Microsoft.EntityFrameworkCore.Infrastructure;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LibraryManagement.Models
{
    public class UserRegister
    {

        public string Login { get; set; }
        [Required(ErrorMessage = "Pole 'hasło' jest wymagane")]
        [MaxLength(50)]
        [DisplayName("Hasło")]
        public string Password1 { get; set; }
        public string Password2 { get; set; }

    }
}
