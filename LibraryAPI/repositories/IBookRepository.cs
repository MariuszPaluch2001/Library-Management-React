using LibraryManagement.Models;

namespace LibraryManagement.Repositories
{
    public interface IBookRepository
    {
        Book? GetBook(int bookId);
        Book? GetBook(string title);
        void Add(Book user);
        void Update(int bookId, Book? book);
        void Delete(int bookId);

        void UndoReserve(int bookId);
        void ReturnBook(int bookId);
        void LeaseBook(int bookId, DateTime? leaseDate);
        void ReserveBook(int bookId, User? user);
        IList<Book> GetBooksToLease();
        IList<Book> GetBooksToReturn();
        IList<Book> GetBooksToReserve();
        IList<Book> GetReservedBooks(string? login);
        IList<Book> Searching(string? searching);
        IList<Book> getBooks();
    }
}
