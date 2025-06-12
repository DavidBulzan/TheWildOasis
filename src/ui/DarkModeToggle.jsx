import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import ButtonIcon from "./ButtonIcon.jsx";
import { useDarkMode } from "../context/DarkModeContext.jsx";

function DarkModeToggle() {
  const { isDarkMode, toggleDarlkMode } = useDarkMode();

  return (
    <ButtonIcon onClick={toggleDarlkMode}>
      {isDarkMode ? (
        <HiOutlineSun color="var(--color-brand-999)" />
      ) : (
        <HiOutlineMoon color="var(--color-brand-999)" />
      )}
    </ButtonIcon>
  );
}

export default DarkModeToggle;
