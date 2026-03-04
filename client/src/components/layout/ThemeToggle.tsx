import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun, Monitor, Eye } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const { user } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch on initial load
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  // Admins rotate System -> Light -> Dark. Farmers toggle High-Contrast for outdoor reading.
  const handleToggle = () => {
    if (user?.role === 'admin') {
      setTheme(theme === 'dark' ? 'light' : theme === 'light' ? 'system' : 'dark');
    } else {
      setTheme(theme === 'dark' ? 'high-contrast' : theme === 'high-contrast' ? 'light' : 'dark');
    }
  };

  const getAriaLabel = () => {
    if (theme === 'dark') return 'Current theme is dark mode. Toggle to change.';
    if (theme === 'high-contrast') return 'Current theme is high contrast mode. Toggle to change.';
    if (theme === 'light') return 'Current theme is light mode. Toggle to change.';
    return 'Current theme is system default. Toggle to change.';
  };

  return (
    <button
      onClick={handleToggle}
      className={`min-h-[44px] min-w-[44px] p-2 rounded-full hover:bg-muted transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className}`}
      aria-label={getAriaLabel()}
      title="Toggle Theme"
    >
      {theme === 'dark' ? (
        <Moon size={20} aria-hidden="true" />
      ) : theme === 'light' ? (
        <Sun size={20} aria-hidden="true" />
      ) : theme === 'high-contrast' ? (
        <Eye size={20} className="text-primary font-bold" aria-hidden="true" />
      ) : (
        <Monitor size={20} aria-hidden="true" />
      )}
    </button>
  );
}
