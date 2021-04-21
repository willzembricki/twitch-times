import React from "react";

function Search({ searchTerm, onUpdateSearch }) {
  return (
    <form id="search-form">
      <h2>Search Blog Titles</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onUpdateSearch(e.target.value)}
      ></input>
      <button id="search-button" type="submit">
        Search
      </button>
    </form>
  );
}

export default Search;
