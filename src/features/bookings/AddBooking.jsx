import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateBookingForm from "./createBookingsForm";

function AddBooking() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="bookings-form">
          <Button>Add new booking</Button>
        </Modal.Open>
        <Modal.Window name="bookings-form">
          <CreateBookingForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddBooking;
