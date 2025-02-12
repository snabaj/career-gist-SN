import React, { useState } from 'react';
import '../App.css';

interface Props {
  onSearch: (query: string) => void;
  loading: boolean;
}

const SearchForm: React.FC<Props> = ({ onSearch, loading }) => {

  const [query, setQuery] = useState('');

  return (
    <div className="search-container">
      <input
        className="search-input"
        id="jobSearch"
        name="jobSearch"
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Job Title"
      />
      <button className="search" onClick={() => onSearch(query)} disabled={loading}>
        {loading ? 'Loading...' : 'Search'}
      </button>
    </div>
  );
};

export default SearchForm;



