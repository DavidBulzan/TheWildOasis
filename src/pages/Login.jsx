import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";

// const LoginLayout = styled.main`
//   min-height: 100vh;
//   display: grid;
//   grid-template-columns: 48rem;
//   align-content: center;
//   justify-content: center;
//   gap: 3.2rem;
//   background-color: var(--color-grey-50);
// `;

const LoginLayout = styled.main`
  min-height: 100vh;
  width: 100%; /* Ensure the layout spans the full width of the viewport */
  display: flex; /* Use flexbox for centering */
  flex-direction: column; /* Stack items vertically */
  align-items: center; /* Center items horizontally */
  justify-content: center; /* Center items vertically */
  gap: 3.2rem;
  background-color: var(
    --color-grey-50
  ); /* Background color spans the full width */
  padding: 2rem; /* Add padding for better responsiveness */

  /* Center the content within the layout */
  .content {
    max-width: 48rem; /* Limit the width of the content */
    width: 100%; /* Ensure the content takes up the full width of its container */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Optional: Add a subtle shadow */
    border-radius: var(--border-radius-md); /* Optional: Add rounded corners */
    padding: 2rem; /* Add padding inside the content box */
    background-color: var(
      --color-grey-0
    ); /* Optional: Add a different background for the content */
  }
`;

function Login() {
  return (
    <LoginLayout>
      <Logo />
      <Heading>Log into your account</Heading>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
