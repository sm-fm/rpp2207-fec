import React, { useState } from 'react';

const Search = (props) => {
  let [term, setTerm] = useState('');

  var search = (val) => {
    if (val.length > 2) {
      props.handleSearch(val);
    } else if (val.length < term.length && val.length === 2) {
      props.handleSearch('');
    }
    setTerm(val);
  };

  return (
    <div id="q-search">
      <input
        type="text"
        id="search-input"
        size="35"
        placeholder="Have a question? Search for answers..."
        onChange={(e) => search(e.target.value)}
      />
    </div>
  );
};

export default Search;