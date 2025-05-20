import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";

export function useBooking() {
  const { bookingId } = useParams();
  console.log("Booking ID from use params:", bookingId);

  const {
    isLoading,
    error,
    data: booking,
  } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
    enabled: !!bookingId,
    retry: false,
  });

  console.log("Booking from useQuery:", booking);
  console.log("isLoading:", isLoading);
  console.log("error:", error);

  return {
    booking,
    isLoading,
    error,
  };
}
