using LibraryManagement.Models;
using LibraryManagement.Repositories;

namespace LibraryManagement.Services
{
    public class UserServiceImpl : UserService
    {
        private readonly IUserRepository userRepository;
        public UserServiceImpl(IUserRepository _userRepository)
        {
            userRepository = _userRepository;
        }

        
        public User? Login(string login, string password)
        {
            return userRepository.GetUser(login, password);
        }

        public User Register(string login, string password, string password_repeat)
        {
            User user = new User();
            if (userRepository.GetUser(login) is null && password == password_repeat)
            {
                user.Login = login;
                user.Password = password;
                user.IsSuperUser = false;
                user.UserCreateTimestamp = System.DateTime.Now;
                userRepository.Add(user);
            }
            return user;
        }

    }
}
