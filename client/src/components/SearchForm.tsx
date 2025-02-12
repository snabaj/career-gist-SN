import React, { useState } from 'react';
import '../App.css';

//Defining Props for the Component
  //Defines the props (onSearch and loading)
  // onSearch(query: string) → Function passed from HomePage.tsx to trigger an API call
  // loading → Boolean flag that prevents multiple searches while API call is in progress
interface Props {
  onSearch: (query: string) => void;
  loading: boolean;
}

//Declaring the Component
  // ✅ Defines SearchForm as a functional component
  // ✅ Destructures onSearch and loading from props
const SearchForm: React.FC<Props> = ({ onSearch, loading }) => {

  //Managing User Input
    // ✅ query stores the user's search input
    // ✅ setQuery updates the state when the user types in the input field
  const [query, setQuery] = useState('');


  //Rendering the input field
    // ✅ Creates a text input field
    // ✅ value={query} ensures it reflects the latest state
    // ✅ onChange={e => setQuery(e.target.value)} updates query as the user types

  //Rendering the Search Button
    // ✅ Calls onSearch(query) when clicked
    // ✅ Disables the button (disabled={loading}) when the API call is in progress
    // ✅ Changes the button text to 'Loading...' while fetching jobs
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

//Key Points:
  // ✅ User types a job title into the input field
  // ✅ When the user clicks "Search"
    // ✅ Calls onSearch(query)
    // ✅ Triggers API call in HomePage.tsx
    // ✅ Disables the button & displays "Loading..."
    // ✅ Once API call is complete:
      // ✅ Jobs are displayed in JobList.tsx
      // ✅ Re-enables the search button


