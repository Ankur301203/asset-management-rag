import React, { useState } from "react";

const MainPage = () => {
  const [query, setQuery] = useState("");
  const [source, setSource] = useState("mongo");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setResponse(null);
    setError("");

    try {
      const res = await fetch("http://localhost:8000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, source }),
      });

      const data = await res.json();

      if (res.ok) {
        setResponse(data.response || data.result || JSON.stringify(data, null, 2));
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch (err) {
      setError("Server not reachable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-neon-100 font-mono">
      {/* Sci-fi animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-900/20 to-transparent"></div>
      </div>

      <div className="relative max-w-3xl mx-auto p-8 space-y-8 z-10">
        {/* Holographic header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-2 tracking-wider">
            ASSET MANAGEMENT RAG
          </h1>
          <div className="h-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full opacity-70 mx-auto w-1/2"></div>
          {/* <p className="mt-4 text-cyan-300 text-opacity-70 text-sm tracking-widest">
            NEURAL QUERY INTERFACE v2.4.1
          </p> */}
        </div>

        {/* Main console */}
        <div className="bg-gray-800/70 backdrop-blur-sm border border-cyan-400/20 rounded-xl p-6 shadow-2xl shadow-cyan-500/10">
          {/* Data source selector */}
          <div className="mb-6">
            <label className="block text-cyan-300 text-sm font-light tracking-wider mb-2">
              DATA SOURCE SELECTION
            </label>
            <div className="relative">
              <select
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900 border border-cyan-400/30 rounded-md text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400 appearance-none"
              >
                <option value="mongo" className="bg-gray-900">MongoDB (Client Profiles)</option>
                <option value="mysql" className="bg-gray-900">MySQL (Transactions)</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-5 w-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Query input */}
          <div className="mb-8">
            <label className="block text-cyan-300 text-sm font-light tracking-wider mb-2">
              QUERY INPUT
            </label>
            <div className="relative">
              <textarea
                rows={4}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. Show me all transactions by client X in the last quarter"
                className="w-full px-4 py-3 bg-gray-900 border border-cyan-400/30 rounded-md text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400 placeholder-cyan-500/50"
              />
              <div className="absolute bottom-2 right-2 text-xs text-cyan-500/50">
                {query.length}/500
              </div>
            </div>
          </div>

          {/* Submit button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full py-3 px-6 rounded-md font-medium tracking-wider transition-all duration-300 ${
              loading
                ? "bg-purple-900/50 text-purple-300 cursor-not-allowed"
                : "bg-gradient-to-r from-cyan-600 to-purple-600 text-white hover:from-cyan-500 hover:to-purple-500 shadow-lg hover:shadow-cyan-500/20"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                PROCESSING QUERY...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                EXECUTE QUERY
              </span>
            )}
          </button>

          {/* Status indicators */}
          <div className="mt-6 flex items-center justify-between text-xs">
            <div className="flex items-center">
              <span className={`h-2 w-2 rounded-full mr-2 ${loading ? 'animate-pulse bg-cyan-400' : 'bg-gray-600'}`}></span>
              <span className="text-cyan-400/80">{loading ? "SYSTEM ACTIVE" : "SYSTEM STANDBY"}</span>
            </div>
          </div>
        </div>

        {/* Response area */}
        {(error || response) && (
          <div className={`p-6 rounded-xl border ${
            error ? "border-red-500/30 bg-red-900/20" : "border-cyan-500/30 bg-cyan-900/20"
          }`}>
            <div className="flex items-center mb-3">
              <div className={`h-3 w-3 rounded-full mr-2 ${error ? 'bg-red-500 animate-pulse' : 'bg-cyan-500'}`}></div>
              <h3 className="text-lg font-medium tracking-wider">
                {error ? "QUERY ERROR" : "RESPONSE DATA"}
              </h3>
            </div>
            <div className={`p-4 rounded-md font-mono text-sm whitespace-pre-wrap overflow-x-auto ${
              error ? "text-red-300" : "text-cyan-100"
            }`}>
              {error || (typeof response === "string" ? response : JSON.stringify(response, null, 2))}
            </div>
            <div className="mt-3 text-xs text-cyan-500/50 flex justify-end">
              {!error && `DATA LENGTH: ${response?.length || 0} BYTES`}
            </div>
          </div>
        )}

      </div>

      {/* Add some global styles */}
      <style jsx global>{`
        body {
          background-color: #111827;
          color: #e5e7eb;
          font-family: 'Courier New', monospace;
        }
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, rgba(56, 189, 248, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(56, 189, 248, 0.05) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  );
};

export default MainPage;