"use client";
import { useState } from 'react';

export default function Page() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState('');

  const handleGenerate = async () => {
    setResult("Generating...");
    const response = await fetch('/api/generate', {
      method: 'POST',
      body: JSON.stringify({ videoUrl: url }),
    });
    const data = await response.json();
    setResult(data.text);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Content Alchemy</h1>
      <input 
        className="border p-2 mt-4 w-full"
        placeholder="Paste YouTube Link Here"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button 
        className="bg-green-600 text-white p-2 mt-2 w-full"
        onClick={handleGenerate}
      >
        Generate Assets
      </button>
      <div className="mt-4 p-4 border bg-gray-50">{result}</div>
    </div>
  );
}
