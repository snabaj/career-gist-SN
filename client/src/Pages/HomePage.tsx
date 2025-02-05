// src/pages/HomePage.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const HomePage: React.FC = () => {
  const [keyword, setKeyword] = useState<string>('');
  const [location, setLocation] = useState<string>('');

  const handleSearch = () => {
    // Here you would ideally redirect to a search results page or fetch data based on these inputs
    console.log(`Searching for ${keyword} in ${location}`);
  };

  return (
    <div className="HomePage">
      <nav>
        <ul>
          <li><Link to="/">Home Page</Link></li>
          <li><Link to="/saved-jobs">Saved Jobs</Link></li>
          <li><Link to="/applied-jobs">Jobs Applied</Link></li>
          <li><Link to="/privacy-policy">Privacy Policy</Link></li>
        </ul>
      </nav>
      <div>
        <h1 className="Career">Career Gist</h1>
        <h2>Because Searching for Jobs Should be Easy.</h2>
        <input className="search"
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Company name, Position, Job Title"
        />
        <input className="location"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
};

export default HomePage;
