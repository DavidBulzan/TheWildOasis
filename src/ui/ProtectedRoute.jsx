import Spinner from "./Spinner";
import styled from "styled-components";
import propTypes from "prop-types";
import { useUser } from "../features/authentication/useUser";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-grey-50);
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  //1 Load the authenticated user
  const { isLoading, isAuthenticated } = useUser();

  //3 If no authenticated user, redicrect to login
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate]
  );

  //2 Show spinner while loading
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  //4 If there is an authenticated user, render the App
  if (isAuthenticated) return children;
}

ProtectedRoute.propTypes = {
  children: propTypes.node.isRequired,
};

export default ProtectedRoute;
