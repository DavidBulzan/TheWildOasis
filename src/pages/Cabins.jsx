import Heading from "../ui/Heading";
import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin";
import CabinTableOperations from "../features/cabins/CabinTableOperations";
import Row from "../ui/Row";
import { useState } from "react";
import styled from "styled-components";
import { HiOutlineFilter } from "react-icons/hi";
import Button from "../ui/Button";

const OperationsWrapper = styled(Row)`
  max-height: ${({ show }) => (show ? "60px" : "0")};
  opacity: ${({ show }) => (show ? "1" : "0")};
  transform: scaleY() ${({ show }) => (show ? 1 : 0.95)};
  overflow: hidden;
  transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: top;
`;

function Cabins() {
  const [showOperations, setShowOperations] = useState(false);
  const handleToggle = () => {
    setShowOperations((prev) => !prev);
  };

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <Button onClick={handleToggle} variation="secondary" size="medium">
          <HiOutlineFilter />
        </Button>
      </Row>
      <OperationsWrapper type="horizontal" show={showOperations}>
        <CabinTableOperations />
      </OperationsWrapper>

      <CabinTable />
      <AddCabin />
    </>
  );
}

export default Cabins;
