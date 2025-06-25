import { useMutation } from "@tanstack/react-query";
import { createEditBooking as createBookingApi } from "../../services/apiBookings";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useCreateBooking() {
  const queryClient = useQueryClient();

  const { mutate: createBooking, isLoading: isCreating } = useMutation({
    mutationFn: createBookingApi,
    onSuccess: () => {
      toast.success("Booking created successfully!");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { createBooking, isCreating };
}
