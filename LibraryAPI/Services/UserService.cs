using LibraryManagement.Models;
namespace LibraryManagement.Services
{
    public interface UserService
    {

        public User? Login(string login, string password);

        public User? Register(string login, string password, string password_repeat);

    }
}
