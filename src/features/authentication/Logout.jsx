import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";

import { useLogout } from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";

function Logout() {
  const { logout, isLoggingOut } = useLogout();

  return (
    <ButtonIcon disabled={isLoggingOut} onClick={logout}>
      {!isLoggingOut ? (
        <HiArrowRightOnRectangle color="var(--color-brand-999)" />
      ) : (
        <SpinnerMini />
      )}
    </ButtonIcon>
  );
}

export default Logout;
