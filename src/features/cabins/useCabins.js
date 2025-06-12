import { useQuery } from "@tanstack/react-query";
import getCabins from "../../services/apiCabins";

export function useCabins({ page } = {}) {
  const {
    isLoading,
    data: { data: cabins = [], count } = {},
    error,
  } = useQuery({
    queryKey: ["cabins", page],
    queryFn: () => getCabins({ page }),
    keepPreviousData: true,
  });

  return {
    cabins,
    isLoading,
    error,
    count,
  };
}
