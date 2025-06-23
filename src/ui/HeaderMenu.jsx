import styled from "styled-components";
import Logout from "../features/authentication/Logout";
import ButtonIcon from "./ButtonIcon";
import { useNavigate } from "react-router-dom";
import { HiOutlineUser } from "react-icons/hi";
import DarkModeToggle from "./DarkModeToggle";
import ModalCalendar from "../features/dashboard/ModalCalendar";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4 rem;
`;

function HeaderMenu() {
  const navigate = useNavigate();

  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <HiOutlineUser color="var(--color-brand-999)" />
        </ButtonIcon>
      </li>
      <li>
        <ModalCalendar />
      </li>
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
