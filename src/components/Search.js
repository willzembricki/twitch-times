import React from "react";

function Search({ searchTerm, onUpdateSearch }) {
  return (
    <form id="search-form" onSubmit={(e) => e.preventDefault()}>
      <label>Search Blog Titles:</label>
      <br />
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onUpdateSearch(e.target.value)}
      ></input>
    </form>
  );
}

export default Search;
