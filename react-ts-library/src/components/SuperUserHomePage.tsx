import { Link } from "react-router-dom";

export function SuperUserHomePage() {
    return(
        <div className="container bcontent">
          <br/>
          <h2>Menu administratora</h2>
          <hr/>
          <div className="list-group">
            <Link className="list-group-item list-group-item-action" to="/AddBook">
              Dodaj książkę
            </Link>
            <Link className="list-group-item list-group-item-action" to="/EditDeleteBook">
              Edytuj/usuń książkę
            </Link>
            <Link className="list-group-item list-group-item-action" to="/BooksToLease">
              Wypożycz książkę
            </Link>
            <Link className="list-group-item list-group-item-action" to="/BooksToReturn">
              Zwróć książkę
            </Link>
            <Link className="list-group-item list-group-item-action" to="/BooksToReserve">
              Zarezerwuj książkę
            </Link>
            <Link className="list-group-item list-group-item-action" to="/UserReservedBooks">
              Twoje książki
            </Link>
            <Link className="list-group-item list-group-item-action" to="/FindBook">
              Znajdź książkę
            </Link>
            <Link className="list-group-item list-group-item-action" to="/Users">
              Użytkownicy
            </Link>
          </div>
        </div>
    ) 
}