using Microsoft.EntityFrameworkCore.Infrastructure;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LibraryManagement.Models
{
    [Table("Users")]
    public class User
    {
        private List<Book>? _books;
        private ILazyLoader LazyLoader { get; set; }
        public User() { }
        private User(ILazyLoader lazyLoader)
        {
            LazyLoader = lazyLoader;
        }
        [Key]
        public int UserID { get; set; }
        [Required(ErrorMessage = "Pole 'login' jest wymagane")]
        [MaxLength(30)]
        [DisplayName("Login")]
        public string Login { get; set; }
        [Required(ErrorMessage = "Pole 'hasło' jest wymagane")]
        [MaxLength(50)]
        [DisplayName("Hasło")]
        public string Password { get; set; }
        [DisplayName("Administrator")]
        public bool IsSuperUser { get; set; }

        public virtual List<Book>? Books
        {
            get => LazyLoader.Load(this, ref _books);
            set => _books = value;
        }
        public DateTime UserCreateTimestamp { get; set; }
    }
}
