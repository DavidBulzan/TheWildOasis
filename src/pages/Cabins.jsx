import Heading from "../ui/Heading";
import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin";

function Cabins() {
  return (
    <>
      <Heading as="h1">All cabins</Heading>
      <p>Filter / Sort</p>

      <CabinTable />

      <AddCabin />
    </>
  );
}

export default Cabins;
