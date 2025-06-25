import React, { useState } from 'react';

function QueryForm({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(query);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask a question like: 'Top 5 portfolios'"
        className="w-full p-3 border rounded mb-4 h-32"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Ask
      </button>
    </form>
  );
}

export default QueryForm;
