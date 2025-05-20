import styled, { css } from "styled-components";

// const Form = styled.form`
//   ${(props) =>
//     props.type === "regular" &&
//     css`
//       padding: 2.4rem 4rem;

//       /* Box */
//       background-color: var(--color-grey-0);
//       border: 1px solid var(--color-grey-100);
//       border-radius: var(--border-radius-md);
//     `}

//   ${(props) =>
//     props.type === "modal" &&
//     css`
//       width: 80rem;
//     `}

//   overflow: hidden;
//   font-size: 1.4rem;
// `;

// Form.defaultProps = {
//   type: "regular",
// };

// export default Form;

const Form = styled.form`
  ${(props) =>
    props.type === "regular" &&
    css`
      padding: 2.4rem 4rem;

      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);

      /* Add a default width */
      width: 100%; /* Ensure it takes up the full width of its container */
      max-width: ${props.maxWidth}; /* Allow for a max-width prop */
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      width: 80rem;
    `}

  overflow: hidden;
  font-size: 1.4rem;
`;

Form.defaultProps = {
  type: "regular",
};

export default Form;
