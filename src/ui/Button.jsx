// import styled from "styled-components";
// import { css } from "styled-components";

// const sizes = {
//   small: css`
// width: fit-content;
// text-transform: uppercase;
// font-size: 1.1rem;
// font-weight: 600;
// padding: 0.4rem 1.2rem;
// border-radius: 100px;
//   `,
//   medium: css`
//     font-size: 1.4rem;
//     padding: 1.2rem 1.6rem;
//     font-weight: 500;
//   `,
//   large: css`
//     font-size: 1.6rem;
//     padding: 1.2rem 2.4rem;
//     font-weight: 500;
//   `,
// };

// const variations = {
//   primary: css`
//     color: var(--color-brand-50);
//     background-color: var(--color-brand-999);

//     &:hover {
//       background-color: var(--color-brand-9999);
//     }
//   `,
//   secondary: css`
//     color: var(--color-grey-600);
//     background: var(--color-grey-0);
//     border: 1px solid var(--color-grey-200);

//     &:hover {
//       background-color: var(--color-grey-50);
//     }
//   `,
//   danger: css`
//     color: var(--color-red-100);
//     background-color: var(--color-red-700);

//     &:hover {
//       background-color: var(--color-red-800);
//     }
//   `,
// };

// const Button = styled.button`
//   border: none;
//   border-radius: var(--border-radius-sm);
//   box-shadow: var(--shadow-sm);
//   cursor: pointer;
//   margin: 20px;

//   ${(props) => sizes[props.size]}
//   ${(props) => variations[props.variation]}
// `;

// Button.defaultProps = {
//   variation: "primary",
//   size: "medium",
// };

// // const Button = styled.button`
// //   border: none;
// //   border-radius: var(--border-radius-sm);
// //   box-shadow: var(--shadow-sm);

// //   ${(props) => sizes[props.size]}
// //   ${(props) => variations[props.variation]}
// // `;

// // const Button = styled.button`
// //   font-size: 1.4rem;
// //   padding: 1.2rem 1.6rem;
// //   border: none;
// //   border-radius: var(--border-radius-sm);
// //   background-color: var(--color-brand-600);
// //   color: var(--color-brand-50);
// //   box-shadow: var(--shadow-sm);
// //   margin: 20px;
// //   cursor: pointer;
// // `;

// export default Button;

import styled, { css } from "styled-components";

const sizes = {
  small: css`
    /* width: fit-content; */
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    text-transform: uppercase;
    font-size: 1.1rem;
    font-weight: 600;
    padding: 0.4rem 1.2rem;
    border-radius: 100px;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

const variations = {
  primary: css`
    color: var(--color-brand-50);
    background-color: var(--color-brand-999);

    &:hover {
      background-color: var(--color-brand-9999);
    }
  `,
  secondary: css`
    color: var(--color-grey-600);
    background: var(--color-grey-0);
    border: 1px solid var(--color-grey-200);

    &:hover {
      background-color: var(--color-grey-50);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
};

const Button = styled.button`
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);

  ${(props) => sizes[props.size]}
  ${(props) => variations[props.variation]}
`;

Button.defaultProps = {
  variation: "primary",
  size: "medium",
};

export default Button;
