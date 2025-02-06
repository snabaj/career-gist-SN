import React from 'react';

interface Props {
  query: string;
  location: string;
  onQueryChange: (query: string) => void;
  onLocationChange: (location: string) => void;
  onSearch: () => void;
  loading: boolean;
}

const SearchForm: React.FC<Props> = ({ query, location, onQueryChange, onLocationChange, onSearch, loading }) => (
  <div>
    <input
      type="text"
      value={query}
      onChange={e => onQueryChange(e.target.value)}
      placeholder="Job Description"
    />
    <input
      type="text"
      value={location}
      onChange={e => onLocationChange(e.target.value)}
      placeholder="Location"
    />
    <button onClick={onSearch} disabled={loading}>
      {loading ? 'Loading...' : 'Search'}
    </button>
  </div>
);

export default SearchForm;