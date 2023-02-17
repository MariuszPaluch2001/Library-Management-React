using LibraryManagement.Models;

namespace LibraryManagement.Repositories
{
    public interface IUserRepository
    {
        User? GetUser(string login);
        User? GetUser(string login, string password);
        User? GetUser(int id);
        IList<User> getUsers();
        void Add(User user);
        void Update(int userId, User user);
        void Delete(int userId);
    }
}
