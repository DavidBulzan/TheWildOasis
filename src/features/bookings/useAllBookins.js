import { useQuery } from "@tanstack/react-query";
import { getAllBookings } from "../../services/apiBookings";

export function useAllBookings() {
  const { data: allBookings, isLoading } = useQuery({
    queryFn: getAllBookings,
    queryKey: ["allBookings"],
  });
  return {
    allBookings,
    isLoading,
  };
}
