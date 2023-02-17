using LibraryManagement.Models;
namespace LibraryManagement.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ManagerContext _context;
        public UserRepository(ManagerContext context)
        {
            _context = context;
        }

        public void Add(User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();
        }

        public void Delete(int userId)
        {
            var result = _context.Users.SingleOrDefault(x => x.UserID == userId);
            if (result is not null)
            {
                _context.Users.Remove(result);
                _context.SaveChanges();
            }
        }

        public User? GetUser(string login)
            => _context.Users.SingleOrDefault(x => x.Login == login);
        public User? GetUser(string login, string password)
            => _context.Users.SingleOrDefault(x => x.Login == login && x.Password == password);
        public User? GetUser(int id)
            => _context.Users.SingleOrDefault(x => x.UserID == id);

        public IList<User> getUsers()
            => _context.Users.ToList();

        public void Update(int userId, User user)
        {
            var result = _context.Users.SingleOrDefault(x => x.UserID == userId);
            if (result is not null)
            {
                result.Login = user.Login;
                result.Password = user.Password;
            }
        }
    }
}
