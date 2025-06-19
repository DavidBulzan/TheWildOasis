import { useQuery } from "@tanstack/react-query";
import { getGuests } from "../../services/apiGuest";

export function useGuests() {
  const { data: guests, isLoading } = useQuery({
    queryFn: getGuests,
    queryKey: ["guest"],
  });

  return {
    guests,
    isLoading,
  };
}
