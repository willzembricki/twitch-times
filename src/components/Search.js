import React from "react";

function Search({ searchTerm, onUpdateSearch }) {
  return (
    <form>
      <h1>Search</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onUpdateSearch(e.target.value)}
      ></input>
      <button type="submit">Search</button>
    </form>
  );
}

export default Search;
