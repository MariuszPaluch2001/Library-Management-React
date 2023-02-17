using Microsoft.EntityFrameworkCore.Infrastructure;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LibraryManagement.Models
{
    [Table("Books")]
    public class Book
    {
        private User? _user;
        private ILazyLoader LazyLoader { get; set; }
        public Book() { }
        private Book(ILazyLoader lazyLoader)
        {
            LazyLoader = lazyLoader;
        }
        [Key]
        public int BookId { get; set; }
        [DisplayName("Autor")]
        [MaxLength(30)]
        public string Author { get; set; }
        [DisplayName("Tytuł")]
        [MaxLength(30)]
        public string Title { get; set; }
        [DisplayName("Data")]
        public int Date { get; set; }
        [DisplayName("Wydawca")]
        [MaxLength(50)]
        public string Publisher { get; set; }
        [DisplayName("Użytkownik")]
        [ForeignKey("User")]
        public virtual User? user { 
            get => LazyLoader.Load(this, ref _user); 
            set => _user = value; 
        }
        [DisplayName("Data zarezerwowania")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        public DateTime? Reserved { get; set; }
        [DisplayName("Data wypożyczenia")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        public DateTime? Leased { get; set; }
        public DateTime BookAddTimestamp { get; set; }
        [Timestamp]
        public byte[]? TimeStamp { get; set; }

    }
}
