import BookingCalendar from "../features/dashboard/BookingsCalendar";
import Spinner from "../ui/Spinner";
import { useAllBookings } from "../features/bookings/useAllBookins";
import { useCabins } from "../features/cabins/useCabins";
import Row from "../ui/Row";

function Calendar() {
  const { allBookings, isLoading: isLoadingBookings } = useAllBookings();
  const { cabins, isLoading: isLoadingCabins } = useCabins();
  console.log("allBookings", allBookings);
  console.log("cabins", cabins);

  if (isLoadingBookings || isLoadingCabins) return <Spinner />;

  return (
    <Row type="vertical">
      <div style={{ gridColumn: "1 / -1" }}>
        <BookingCalendar bookings={allBookings} cabins={cabins} />
      </div>
    </Row>
  );
}

export default Calendar;
