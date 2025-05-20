import { useEffect } from "react";
import { getBooking } from "../../services/apiBookings";

export function Test() {
  useEffect(() => {
    async function fetchBooking() {
      try {
        const booking = await getBooking(24);
        console.log("Booking data:", booking);
      } catch (error) {
        console.error("Error fetching booking:", error);
      }
    }

    fetchBooking();
  }, []);

  return (
    <div>
      <h1>Test Component</h1>
      <p>Check the console for booking data.</p>
    </div>
  );
}
