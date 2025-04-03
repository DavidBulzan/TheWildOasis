import { useQuery } from "@tanstack/react-query";
import getCabins from "../../services/apiCabins";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: async () => {
      try {
        return getCabins();
      } catch (error) {
        console.error("Error fetching data", error);
        throw new error();
      }
    },
  });
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("discount") || "all";

  if (isLoading) return <Spinner />;
  if (error) return <div>Error loading cabins {error.message}</div>;

  const filteredCabins = cabins.filter((cabin) => {
    if (filterValue === "no-discount") return cabin.discount === 0;
    if (filterValue === "with-discount")
      return cabin.discount && cabin.discount > 0;
    return true;
  });

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
          {filteredCabins.map((cabin) => (
            <CabinRow cabin={cabin} key={cabin.id} />
          ))}
        </Table.Body>
      </Table>
    </Menus>
  );
}

export default CabinTable;
