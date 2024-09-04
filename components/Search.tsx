'use client';
import React, { useState } from 'react';

interface SearchProps {
  data: Array<{ id: number; name: string }>;
}

const Search: React.FC<SearchProps> = ({ data }) => {
  const [query, setQuery] = useState(''); // State to store the current search query

  const filteredData = data
    .filter(item => item.name.toLowerCase().includes(query.toLowerCase())) // Filter the data array to include only items whose names contain the query string (case-insensitive)
    .slice(0, 20); // Limit to the first 20 items

  return (
    <div className="space-y-4 flex flex-col px-20">
      <h1 className="font-bold">Real-Time Search</h1>
      <input
        type="text"
        value={query} // Bind the input value to the query state
        onChange={e => setQuery(e.target.value)} // Update the query state on input change
        placeholder="Search..."
        className="p-2 w-[200px] mb-4 border border-gray-300 rounded"
      />
      <ul>
        {/* Render the list of filtered data */}
        {filteredData.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
