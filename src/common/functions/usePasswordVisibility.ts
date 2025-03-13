import { useState, useCallback } from "react";

export function usePasswordVisibility() {
  const [showPassword, setShowPassword] = useState<Record<number, boolean>>({});

  const togglePasswordVisibility = useCallback((index: number) => {
    setShowPassword((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  }, []);

  return { showPassword, togglePasswordVisibility };
}
