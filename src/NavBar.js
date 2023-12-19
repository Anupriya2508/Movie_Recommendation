// NavBar.js
import React, { useState } from 'react';

const NavBar = ({ onSearch, onNewMoviesClick, onHomeClick }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setQuery(searchTerm);
    onSearch(searchTerm);
  };

  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="navigation">
      <ul className="nav1">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search"
            onChange={handleSearch}
            value={query}
            className="search-input"
          />
        </div>
        <li onClick={handleHomeClick}>Home</li>
        <li>New Movies</li>
      </ul>
    </div>
  );
};

export default NavBar;
