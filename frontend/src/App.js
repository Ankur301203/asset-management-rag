import React, { useState } from 'react';
import QueryForm from './components/QueryForm';
import ResponseBox from './components/ResponseBox';

function App() {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false); // 🚨 loading state

  const handleQuery = async (query) => {
    setLoading(true); // ⏳ Start loading
    setResponse('');  // Clear previous response
    try {
      const res = await fetch('http://127.0.0.1:8000/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();
      setResponse(data.response);
    } catch (err) {
      setResponse('❌ Error: Unable to fetch response.');
    } finally {
      setLoading(false); // ✅ Stop loading
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-6">Asset Management RAG UI</h1>
      <QueryForm onSubmit={handleQuery} />
      
      {/* Loader Spinner */}
      {loading && (
        <div className="flex justify-center items-center my-4">
          <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          <span className="ml-3 text-blue-600">Fetching response...</span>
        </div>
      )}

      {/* Response Box */}
      {!loading && response && <ResponseBox response={response} />}
    </div>
  );
}

export default App;
