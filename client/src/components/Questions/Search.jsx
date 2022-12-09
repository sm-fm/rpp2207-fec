import React, { useState, useEffect } from 'react';

const Search = () => {
  return (
    <div id="q-search">
      <p id="q-search-icon">I</p>
      <input
        type="text"
        id="search-input"
        size="35"
        placeholder="Have a question? Search for answers..."
      />
    </div>
  )
}

export default Search;