export function toggleTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.style.setProperty('--foreground-rgb', '255, 255, 255');
      document.documentElement.style.setProperty('--background-start-rgb', '0, 0, 0');
      document.documentElement.style.setProperty('--background-end-rgb', '0, 0, 0');
    } else {
      document.documentElement.style.setProperty('--foreground-rgb', '0, 0, 0');
      document.documentElement.style.setProperty('--background-start-rgb', '255, 255, 255');
      document.documentElement.style.setProperty('--background-end-rgb', '255, 255, 255');
    }
  }