import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const filters = [];

  // 1) Filter
  const filterValue = searchParams.get("status") || "all";
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue, method: "eq" };
  if (filter) filters.push(filter);

  const guestName = (searchParams.get("guest") || "").toLowerCase();
  const isGuestSearchActive = Boolean(guestName);

  // 2) SortBy
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // 3) Pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const pageOrNull = isGuestSearchActive ? null : page;

  // 4) Query
  const {
    data: { data: bookings = [], count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings", filters, sortBy, pageOrNull],
    queryFn: () => getBookings({ filters, sortBy, page: pageOrNull }),
  });

  // 5) Search Guest by name (frontend filter)
  const filteredBookings = isGuestSearchActive
    ? bookings.filter((b) =>
        b.guest?.fullName?.toLowerCase().includes(guestName)
      )
    : bookings;

  // 6) Pagination count
  const pageCount = isGuestSearchActive ? 1 : Math.ceil(count / PAGE_SIZE);

  // 7) Prefetching on pagination (only when paginating)
  if (!isGuestSearchActive && page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  }
  if (!isGuestSearchActive && page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });
  }

  return {
    bookings: filteredBookings,
    isLoading,
    error,
    count: isGuestSearchActive ? filteredBookings.length : count,
    pageCount,
  };
}
