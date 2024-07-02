import React from 'react';

const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <div className="theme-toggle">
      <label className="switch">
        <input type="checkbox" checked={theme === 'dark'} onChange={toggleTheme} />
        <span className="slider round"></span>
      </label>
      <span>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
    </div>
  );
};

export default ThemeToggle;
