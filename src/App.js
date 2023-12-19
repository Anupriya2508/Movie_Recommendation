import React, { useState } from 'react';
import NavBar from './NavBar';
import './index.css';
import Movies from './Movies';
import Image from './Image';


function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };


  return (
    <div className="App">
      <NavBar
        onSearch={handleSearch} />
      <Image />
      <div className="movies">
        <Movies searchTerm={searchTerm} />
      </div>
    </div>
  );
}

export default App;