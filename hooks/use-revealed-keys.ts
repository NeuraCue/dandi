import { useState, useCallback } from "react";

/**
 * Custom hook for managing revealed API keys
 * Single Responsibility: Handles key reveal state
 */
export function useRevealedKeys() {
  const [revealedKeys, setRevealedKeys] = useState<Set<string>>(new Set());

  const toggleReveal = useCallback((id: string) => {
    setRevealedKeys((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  const isRevealed = useCallback(
    (id: string) => revealedKeys.has(id),
    [revealedKeys]
  );

  return {
    revealedKeys,
    toggleReveal,
    isRevealed,
  };
}
