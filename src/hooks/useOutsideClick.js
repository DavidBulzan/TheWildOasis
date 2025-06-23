import { useEffect, useRef } from "react";

export function useOutsideClick(handler) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          // Check if the click target is inside another modal
          const clickedModal = e.target.closest("[data-modal]");
          const currentModal = ref.current.closest("[data-modal]");

          // Only close if not clicking on a nested modal
          if (!clickedModal || clickedModal === currentModal) {
            handler();
          }
        }
      }

      document.addEventListener("mousedown", handleClick, true);
      return () => document.removeEventListener("mousedown", handleClick, true);
    },
    [handler]
  );

  return ref;
}
