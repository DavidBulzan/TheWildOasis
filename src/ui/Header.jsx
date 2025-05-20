import styled from "styled-components";
import PropTypes from "prop-types";
import Logout from "../features/authentication/Logout";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    padding: 1.2rem 2.4rem;
  }
`;

const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 2.4rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

function Header({ onToggleSidebar }) {
  return (
    <StyledHeader>
      <Logout />
      <HamburgerButton onClick={onToggleSidebar}>☰</HamburgerButton>
    </StyledHeader>
  );
}

Header.propTypes = {
  onToggleSidebar: PropTypes.func.isRequired, // Add this line
};

export default Header;
