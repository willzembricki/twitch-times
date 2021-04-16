import React, { useState } from "react";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <form>
      <h1>Search</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      ></input>
      <button type="submit">Search</button>
    </form>
  );
}

export default Search;
