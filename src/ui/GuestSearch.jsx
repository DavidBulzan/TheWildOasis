import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const Input = styled.input`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
  color: var(--color-grey-700);
  width: 20rem;

  &::placeholder {
    opacity: 1;
    color: var(--color-grey-700);
  }
`;

function GuestSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const guest = searchParams.get("guest") || "";

  function handleChange(e) {
    searchParams.set("guest", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Input
      type="text"
      placeholder="Search by guest name"
      value={guest}
      onChange={handleChange}
      style={{ minWidth: "18rem" }}
    />
  );
}

export default GuestSearch;
