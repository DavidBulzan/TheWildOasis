import Heading from "../ui/Heading";
import Row from "../ui/Row";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
// import styled from "styled-components";

// const Row = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 1.6rem;
//   margin-bottom: 2rem;
//   padding: 1rem;
//   flex-direction: column;
// `;

function Account() {
  return (
    <>
      <Heading as="h1">Update your account</Heading>

      <Row>
        <Heading as="h3">Update user data</Heading>
        <UpdateUserDataForm />
      </Row>

      <Row>
        <Heading as="h3">Update password</Heading>
        <UpdatePasswordForm />{" "}
      </Row>
    </>
  );
}

export default Account;
