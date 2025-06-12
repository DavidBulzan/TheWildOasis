import getCabins from "../../services/apiCabins";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../ui/Pagination";
import { useQueryClient } from "@tanstack/react-query";
import { PAGE_SIZE } from "../../utils/constants";
import { useCabins } from "./useCabins";

function CabinTable() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  //Pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const { cabins, isLoading, error, count } = useCabins({ page });

  //Pre-fetching
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["cabins", page + 1],
      queryFn: () => getCabins({ page: page + 1 }),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["cabins", page - 1],
      queryFn: () => getCabins({ page: page - 1 }),
    });
  }

  //Error handling
  if (isLoading) return <Spinner />;
  if (!cabins.length) return <Empty resource="cabins" />;
  if (error) return <div>Error loading cabins {error.message}</div>;

  //Fiter value
  const filterValue = searchParams.get("discount") || "all";

  //1) Filter
  let filteredCabins;
  if (filterValue === "all") filteredCabins = cabins;
  if (filterValue === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filterValue === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  //2) Sort
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body>
          {sortedCabins.map((cabin) => (
            <CabinRow cabin={cabin} key={cabin.id} />
          ))}
        </Table.Body>

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default CabinTable;
