import { Link } from "react-router-dom";

export function NormalUserHomePage() {
    return(
        <div className="container bcontent">
        <br/>
        <h2>Menu użytkownika</h2>
        <hr/>
            <div className="list-group">
                <Link className="list-group-item list-group-item-action" to="/BooksToReserve">
                    Zarezerwuj książkę
                </Link>
                <Link className="list-group-item list-group-item-action" to="/FindBook">
                    Znajdź książkę
                </Link>
                <Link className="list-group-item list-group-item-action" to="/UserReservedBooks">
                    Twoje książki
                </Link>
            </div>
        </div>
    ) 
}