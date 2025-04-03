import Heading from "../ui/Heading";
import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin";
import CabinTableOperations from "../features/cabins/CabinTableOperations";

function Cabins() {
  return (
    <>
      <Heading as="h1">All cabins</Heading>
      <CabinTableOperations />

      <CabinTable />
      <AddCabin />
    </>
  );
}

export default Cabins;
