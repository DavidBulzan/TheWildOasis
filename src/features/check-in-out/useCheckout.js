import { useMutation } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export function useCheckout() {
  const queryClinet = useQueryClient();

  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out!`);
      queryClinet.invalidateQueries({ active: true });
    },

    onError: () =>
      toast.error("There was an error while checking out the booking."),
  });

  return { checkout, isCheckingOut };
}
