import { useMutation } from "@tanstack/react-query";
import { createGuest as createGuestApi } from "../../services/apiGuest";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useCreateGuest() {
  const queryClient = useQueryClient();
  const { mutate: createGuest, isLoading: isCreating } = useMutation({
    mutationFn: createGuestApi,
    onSuccess: () => {
      toast.success("Guest created successfully!");
      queryClient.invalidateQueries({ queryKey: ["guest"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { createGuest, isCreating };
}
