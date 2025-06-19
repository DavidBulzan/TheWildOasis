import Button from "../../ui/Button";
import PropTypes from "prop-types";
import { useCheckout } from "./useCheckout";
import { useActivity } from "./useActivity";
import handleInvoice from "./handleCheckout";
import toast from "react-hot-toast";

function CheckoutButton({ bookingId }) {
  const { checkout, isCheckingOut } = useCheckout();
  const { activities } = useActivity();
  const { guest } = activities || {};

  const handleCheckoutWithInvoice = async () => {
    try {
      await checkout(bookingId);

      await handleInvoice({
        activities,
        bookingId,
        sendEmail: guest?.email === "davidbulzan36@gmail.com",
      });
    } catch (error) {
      console.error("Checkout failed:", error);
      toast.error("Checkout failed. Please try again.");
    }
  };

  return (
    <Button
      variation="primary"
      size="small"
      onClick={handleCheckoutWithInvoice}
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
