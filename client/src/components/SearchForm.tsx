import React, { useState } from 'react';

interface Props {
  onSearch: (query: string) => void;
  loading: boolean;
}

const SearchForm: React.FC<Props> = ({ onSearch, loading }) => {
  const [query, setQuery] = useState('');

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Job Title"
      />
      <button onClick={() => onSearch(query)} disabled={loading}>
        {loading ? 'Loading...' : 'Search'}
      </button>
    </div>
  );
};

export default SearchForm;
