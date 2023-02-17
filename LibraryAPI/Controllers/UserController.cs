using LibraryManagement.Models;
using LibraryManagement.Repositories;
using LibraryManagement.Services;
using Microsoft.AspNetCore.Mvc;

namespace LibraryAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller
    {
        private readonly IUserRepository userRepository;
        private UserService userService;

        public UserController(UserService _userService, IUserRepository _userRepository)
        {
            userService = _userService;
            userRepository = _userRepository;
        }

        [HttpPost("Login")]
        public IActionResult login(User user_data)
        {
            User? user = userService.Login(user_data.Login, user_data.Password);
            if (user is not null)
            {
                return Ok(new { IsLogged = true, isSuperUser = user.IsSuperUser });
            }
            else
            {
                return Ok(new { IsLogged = false });
            }
        }

        [HttpGet("GetAllUsers")]
        public IActionResult GetUsers()
        {
            return Ok(userRepository.getUsers().Select(x => x.Login).ToList());
        }

        [HttpPost("Register")]
        public IActionResult register(UserRegister new_user)
        {
            User? user = userService.Register(new_user.Login, new_user.Password1, new_user.Password2);
            if (user is not null && user.Login is not null)
            {
                return Ok(new { IsCreated = true});
            }
            else
            {
                return Ok(new { IsCreated = false });
            }
        }

        [HttpDelete("Delete")]
        public IActionResult deleteAccount(User user)
        {
            if (!string.IsNullOrEmpty(user.Login))
            {
                User? user_db = userRepository.GetUser(user.Login);
                if (user_db is not null && user_db.Password == user.Password && user_db.Books is not null && user_db.Books.Count() == 0)
                {
                    userRepository.Delete(user_db.UserID);
                    return Ok("Account deleted");
                }
                else
                {
                    return BadRequest("To account belongs not returned books.");
                }
            }
            else
            {
                return BadRequest("Account not deleted");
            }
        }
    }
}
