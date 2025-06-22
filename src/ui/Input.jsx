// import styled from "styled-components";

// const Input = styled.input`
//   border: 1px solid var(--color-grey-300);
//   background-color: var(--color-grey-0);
//   border-radius: 9px;
//   box-shadow: var(--shadow-sm);
//   padding: 0.8rem 0.2;
// `;

// export default Input;

import styled from "styled-components";

const Input = styled.input`
  appearance: none;
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  color: var(--color-grey-900);
  border-radius: 0;
  border-top-left-radius: 0.375rem;
  border-top-right-radius: 0.375rem;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  display: block;
  width: 100%;
  padding: 0.5rem 0.75rem 0.5rem 2.5rem;
  font-size: 1%.5; /* Increased font size */
  line-height: 1.5rem; /* Increased line height */
  position: relative;
  box-shadow: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  height: 3.1rem;

  &::placeholder {
    color: var(--color-grey-500);
    opacity: 1;
  }

  &:focus {
    outline: none;
    border-color: var(--color-green-500);
    box-shadow: 0 0 0 1px var(--color-green-500);
    z-index: 10;
  }
`;

export default Input;
