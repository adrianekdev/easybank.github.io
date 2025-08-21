import React, { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  // Set dark theme by default on mount
  React.useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="animate-scale-in"
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </Button>
  );
};