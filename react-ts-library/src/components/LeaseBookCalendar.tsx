import { SetStateAction, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Calendar } from "react-calendar";
import { Requests } from "../requests/Requests";

interface leaseBookCalendar { 
    selectedBook: number,
    showCalendar: boolean,
    handleCloseCalendar: () => void,
    refreshList : () => void;
}

export function LeaseBookCalendar({refreshList, handleCloseCalendar, showCalendar, selectedBook} : leaseBookCalendar) {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const leaseBook = (date : Date | null) => {
        Requests.leaseBook(selectedBook, date).then(res =>{
          if (res.res){
            alert("Book leased")
            refreshList();
          } else{
            alert("Book couldn't be leased")
          }
        })
    }
    return (
        <Modal show={showCalendar} onHide={handleCloseCalendar}>
        <Modal.Header closeButton>
          <Modal.Title>Wybierz date zwrotu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Calendar onChange={(date: SetStateAction<Date | null>) => setSelectedDate(date)} value={selectedDate} />
            <br/>
            <Button variant="secondary" onClick={handleCloseCalendar}>
              Cancel
            </Button>
            <Button variant="primary" className="myBtn" onClick={() => {
              leaseBook(selectedDate);
              handleCloseCalendar();
            }}>
              Lease
            </Button>      
        </Modal.Body>
      </Modal>
    )
}