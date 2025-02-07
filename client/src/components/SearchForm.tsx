import React, { useState } from 'react';

interface Props {
  onSearch: (query: string) => void;
  loading: boolean;
}

const SearchForm: React.FC<Props> = ({ onSearch, loading }) => {
  const [query, setQuery] = useState<string>('');

  const handleSearchClick = () => {
    if (query.trim() !== '') {
      onSearch(query); // Call search only when the button is clicked
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Job Description"
      />
      <button onClick={handleSearchClick} disabled={loading}>
        {loading ? 'Loading...' : 'Search'}
      </button>
    </div>
  );
};

export default SearchForm;
