import Modal from "../../ui/Modal";
import BookingCalendar from "./BookingsCalendar";
import ButtonIcon from "../../ui/ButtonIcon";
import { HiOutlineCalendar } from "react-icons/hi";
import { useAllBookings } from "../bookings/useAllBookins";
import { useCabins } from "../cabins/useCabins";

function ModalCalendar() {
  const { allBookings } = useAllBookings();
  const { cabins } = useCabins();

  return (
    <div>
      <Modal>
        <Modal.Open opens="calendar">
          <ButtonIcon>
            <HiOutlineCalendar color="var(--color-brand-999)" />
          </ButtonIcon>
        </Modal.Open>
        <Modal.Window name="calendar">
          <div style={{ gridColumn: "1 / -1" }}>
            <BookingCalendar bookings={allBookings} cabins={cabins} />
          </div>
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default ModalCalendar;
