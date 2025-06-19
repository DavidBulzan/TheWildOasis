import Button from "../../ui/Button";
import PropTypes from "prop-types";
import { useCheckout } from "./useCheckout";
import { useActivity } from "./useActivity";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { formatCurrency } from "../../utils/helpers";

function CheckoutButton({ bookingId }) {
  const { checkout, isCheckingOut } = useCheckout();
  const { activities } = useActivity();
  console.log("activities", activities);

  const {
    id,
    startDate,
    endDate,
    totalPrice,
    extrasPrice,
    guest,
    numNights,
    numGuests,
  } = activities?.find((a) => a.id === bookingId) || {};

  function handleCheckout() {
    //1 generate pdf
    const doc = new jsPDF();
    doc.setFont("Helvetica");

    //logo header
    const imgWidth = 50;
    const imgHeight = 35;
    doc.addImage(
      "/logo-light.png",
      "PNG",
      (210 - imgWidth) / 2,
      10,
      imgWidth,
      imgHeight
    );

    //Table
    autoTable(doc, {
      startY: 70,
      head: [["Field", "Value"]],
      body: [
        ["Booking ID", id || ""],
        ["Guest Name", guest?.fullName || ""],
        ["Guest Email", guest?.email || ""],
        ["Number of Guests", numGuests || ""],
        ["Start Date", startDate || ""],
        ["End Date", endDate || ""],
        ["Number of nights stayed", numNights || ""],
        ["Extras Price", formatCurrency(extrasPrice) || ""],
        ["Total Price", formatCurrency(totalPrice) || ""],
      ],
      theme: "grid",
      headStyles: { fillColor: [47, 84, 23] },
    });
    doc.save(`invoice-booking-${id}.pdf`);
    checkout(bookingId);
  }

  return (
    <Button
      variation="primary"
      size="small"
      onClick={handleCheckout}
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
}

CheckoutButton.propTypes = {
  bookingId: PropTypes.number.isRequired,
};

export default CheckoutButton;
