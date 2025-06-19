import { useQuery } from "@tanstack/react-query";
import { getStaysActivity } from "../../services/apiBookings";

export function useActivity() {
  const { data: activities, isLosdin } = useQuery({
    queryFn: getStaysActivity,
    queryKey: ["stays-activity"],
  });

  return {
    activities,
    isLosdin,
  };
}
