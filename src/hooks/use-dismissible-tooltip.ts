import { useState } from "react";

export function useDismissibleTooltip() {
  const [dismissed, setDismissed] = useState(false);
  const [focused, setFocused] = useState(false);

  function dismissTooltip() {
    setDismissed(true);
    setFocused(false);
  }

  function focusTooltip() {
    setDismissed(false);
    setFocused(true);
  }

  function blurTooltip() {
    setFocused(false);
  }

  function resetDismissal() {
    setDismissed(false);
  }

  function shouldShowTooltip(hovered: boolean) {
    return (hovered || focused) && !dismissed;
  }

  return {
    blurTooltip,
    dismissTooltip,
    focusTooltip,
    resetDismissal,
    shouldShowTooltip,
  };
}
