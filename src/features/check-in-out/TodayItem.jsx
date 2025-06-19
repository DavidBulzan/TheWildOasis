import styled from "styled-components";
import Tag from "../../ui/Tag";
import PropTypes from "prop-types";
import Button from "../../ui/Button";
import CheckoutButton from "./CheckoutButton";
import { Flag } from "../../ui/Flag";
import { Link } from "react-router-dom";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

function TodayItem({ activity }) {
  const { id, guest, status, numNights } = activity;

  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
      {status === "checked-in" && <Tag type="blue">Departing</Tag>}

      <Flag src={guest.countryFlag} alt={`Flag of ${guest.country}`} />
      <Guest>{guest.fullName}</Guest>
      <div>{numNights} nights </div>

      {status === "unconfirmed" && (
        <Button
          size="small"
          variation="primary"
          as={Link}
          to={`/checkin/${id}`}
        >
          Check in
        </Button>
      )}
      {status === "checked-in" && (
        <CheckoutButton bookingId={id} activity={activity} />
      )}
    </StyledTodayItem>
  );
}

TodayItem.propTypes = {
  activity: PropTypes.shape({
    id: PropTypes.number.isRequired,
    guest: PropTypes.object.isRequired,
    status: PropTypes.string.isRequired,
    numNights: PropTypes.number.isRequired,
  }).isRequired,
};

export default TodayItem;
