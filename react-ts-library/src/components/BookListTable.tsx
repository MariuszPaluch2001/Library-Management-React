import { Table } from "react-bootstrap";
import { Book } from "../data/Interfaces";


interface booksProps { books : Book [] }

export function BookListTable({ books } : booksProps){
    return (
          <Table className='mt-4' striped bordered hover size='sm'>
            <thead>
              <tr>
                <th>Author</th>
                <th>Title</th>
                <th>Date</th>
                <th>Publisher</th>
              </tr>
            </thead>
            <tbody>
              {books.map(item => (
                <tr key={item.bookId}>
                  <td>{item.author}</td>
                  <td>{item.title}</td>
                  <td>{item.date}</td>
                  <td>{item.publisher}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        );
}