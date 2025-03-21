import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import PropTypes from "prop-types";

const StyledSidebar = styled.aside`
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: ${(props) => (props.isOpen ? "0" : "-100%")};
    height: 100vh;
    width: 20rem;
    background-color: var(--color-grey-0);
    box-shadow: var(--shadow-lg);
    transition: left 0.3s ease-in-out;
    z-index: 1000;
  }
`;

function Sidebar({ isOpen }) {
  return (
    <StyledSidebar isOpen={isOpen}>
      <Logo />
      <MainNav />
    </StyledSidebar>
  );
}

Sidebar.propTypes = {
  isOpen: PropTypes.func.isRequired, // Add this line
};

export default Sidebar;
