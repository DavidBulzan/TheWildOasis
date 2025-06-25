import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditBooking } from "../../services/apiBookings";

export function useUpdateBooking() {
  const queryClient = useQueryClient();
  const { mutate: editBooking, isLoading: isEditing } = useMutation({
    mutationFn: ({ newBookingData, id }) =>
      createEditBooking(newBookingData, id),
    onSuccess: () => {
      toast.success("Booking succesfully edited!");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { editBooking, isEditing };
}
