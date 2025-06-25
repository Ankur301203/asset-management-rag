import React from 'react';

function ResponseBox({ response }) {
  return (
    <div className="w-full max-w-md bg-white p-4 rounded shadow mt-6">
      <h2 className="text-xl font-semibold mb-2">Response</h2>
      <pre className="whitespace-pre-wrap">{response}</pre>
    </div>
  );
}

export default ResponseBox;
