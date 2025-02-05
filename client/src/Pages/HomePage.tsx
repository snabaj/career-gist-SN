// src/pages/HomePage.tsx
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import SearchForm from '../components/SearchForm';
import '../App.css';

const HomePage: React.FC = () => {
  const [keyword, setKeyword] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = () => {
    setLoading(true);
    console.log(`Searching for ${keyword} in ${location}`);
    // Simulate a search operation
    setTimeout(() => {
      setLoading(false);
      // Here, you would handle the actual search logic, such as querying a database or calling an API.
    }, 2000); // Simulate a network request
  };

  return (
    <div className="HomePage">
      <Navbar />
      <h1 className="Career">Career Gist</h1>
      <h2>Because Searching for Jobs Should be Easy.</h2>
      <SearchForm
        query={keyword}
        location={location}
        onQueryChange={setKeyword}
        onLocationChange={setLocation}
        onSearch={handleSearch}
        loading={loading}
      />
    </div>
  );
};

export default HomePage;
