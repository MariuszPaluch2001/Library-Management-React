using LibraryManagement.Models;
using Microsoft.AspNetCore.Mvc;
using LibraryManagement.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using LibraryAPI.models;

namespace LibraryManagement.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BookController : Controller
    {

        private IUserRepository userRepository;
        private IBookRepository bookRepository;
        public BookController(IBookRepository _bookRepository, IUserRepository _userRepository)
        {
            bookRepository = _bookRepository;
            userRepository = _userRepository;
        }

        [HttpPost("AddBook")]
        public IActionResult AddBook(Book book)
        {
            bookRepository.Add(book);
            return Ok("Book added.");
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteBook(int id)
        {
            bookRepository.Delete(id);
            return Ok("Deleted Successfully");
        }

        [HttpPut("UpdateBook/{id}")]
        public IActionResult UpdateBook(int id, Book book)
        {
            Book? bookRepo = bookRepository.GetBook(id);
            if (bookRepo == null)
            {
                return BadRequest("There is no such book");
            }
            else if (Convert.ToBase64String(book.TimeStamp) == Convert.ToBase64String(bookRepo.TimeStamp))
            {
                bookRepository.Update(id, book);
                return Ok("Updated successfuly");
            } else
            {
                return StatusCode(409);
            }
        }

        [HttpPut("UndoReserve/{id}")]
        public IActionResult UndoReserve(int id)
        {
            bookRepository.UndoReserve(id);
            return Ok("Undo reserve");
        }

        [HttpPut("ReturnBook/{id}")]
        public IActionResult ReturnBook(int id)
        {
            bookRepository.ReturnBook(id);
            return Ok("Book returned");
        }

        [HttpPut("ReserveBook/{id}")]
        public IActionResult ReserveBook([FromRoute] int id, [FromBody] ReserveRequest request)
        {
            Book? book = bookRepository.GetBook(id);

            if (book == null || Convert.ToBase64String(book.TimeStamp) != request.Timestamp)
            {
                return StatusCode(409);
            }
                if (!string.IsNullOrEmpty(request.Login))
            {
                User? user = userRepository.GetUser(request.Login);
                bookRepository.ReserveBook(id, user);
            }

            return Ok("Book reserved");
        }

        [HttpPut("LeaseBook/{id}")]
        public IActionResult LeaseBook([FromRoute] int id, [FromBody] DateTime? leaseDate)
        {
            bookRepository.LeaseBook(id, leaseDate);
            return Ok("Book leased");
        }

        [HttpGet("GetByID/{id}")]
        public IActionResult GetBook(int id)
        {
            return Ok(bookRepository.GetBook(id));
        }

        [HttpGet("GetBookByName/{title}")]
        public IActionResult GetBook(string title)
        {
            return Ok(bookRepository.GetBook(title));
        }

        [HttpGet("Searching/{title}")]
        public IActionResult Searching(string title)
        {
            return Ok(bookRepository.Searching(title));
        }

        [HttpGet("GetAllBooks")]
        public IActionResult GetBooks()
        {
            return Ok(bookRepository.getBooks());
        }

        [HttpGet("GetReservedBooks/{login}")]
        public IActionResult GetReservedBooks(string login)
        {
            return Ok(bookRepository.GetReservedBooks(login));
        }

        [HttpGet("GetBooksToReserve")]
        public IActionResult GetBooksToReserve()
        {
            return Ok(bookRepository.GetBooksToReserve());
        }

        [HttpGet("GetBooksToLease")]
        public IActionResult GetBooksToLease()
        {
            return Ok(bookRepository.GetBooksToLease());
        }

        [HttpGet("GetBooksToReturn")]
        public IActionResult GetBooksToReturn()
        {
            return Ok(bookRepository.GetBooksToReturn());
        }

    }
}