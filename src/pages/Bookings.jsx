import Heading from "../ui/Heading";
import Row from "../ui/Row";
import BookingTable from "../features/bookings/BookingTable";
import BookingTableOperations from "../features/bookings/BookingTableOperations";
import AddBooking from "../features/bookings/AddBooking";
import Button from "../ui/Button";
import { useState } from "react";
import { HiOutlineFilter } from "react-icons/hi";
import styled from "styled-components";

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

function Bookings() {
  const [showOperations, setShowOperations] = useState(false);
  const handleToggle = () => {
    setShowOperations((prev) => !prev);
  };

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <Button onClick={handleToggle} variation="secondary" size="medium">
          <HiOutlineFilter />
        </Button>
      </Row>
      <OperationsWrapper type="horizontal" show={showOperations}>
        <BookingTableOperations />
      </OperationsWrapper>

      <BookingTable />
      <AddBooking />
    </>
  );
}

export default Bookings;
