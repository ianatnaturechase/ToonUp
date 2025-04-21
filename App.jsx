import React, { useState } from 'react';
import axios from 'axios';

export default function App() {
  const [image, setImage] = useState(null);
  const [industry, setIndustry] = useState('');
  const [vibe, setVibe] = useState('');
  const [concept, setConcept] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!image || !industry || !vibe || !concept) return alert('Please complete all fields.');
    const formData = new FormData();
    formData.append('image', image);
    formData.append('industry', industry);
    formData.append('vibe', vibe);
    formData.append('concept', concept);

    setLoading(true);
    try {
      const res = await axios.post('/generate-meme', formData);
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to generate meme.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-4 font-sans">
      <h1 className="text-2xl font-bold mb-4">Cartoon Meme Generator</h1>
      <input type="file" onChange={(e) => setImage(e.target.files[0])} className="mb-3" />
      <input type="text" placeholder="Industry" value={industry} onChange={(e) => setIndustry(e.target.value)} className="w-full p-2 mb-3 border rounded" />
      <input type="text" placeholder="Vibe" value={vibe} onChange={(e) => setVibe(e.target.value)} className="w-full p-2 mb-3 border rounded" />
      <textarea placeholder="Concept" value={concept} onChange={(e) => setConcept(e.target.value)} className="w-full p-2 mb-3 border rounded"></textarea>
      <button onClick={handleSubmit} disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
        {loading ? 'Generating...' : 'Generate Meme'}
      </button>
      {result && (
        <div className="mt-6">
          <img src={result.imageUrl} alt="Meme" className="rounded shadow mb-4" />
          <h2 className="text-lg font-semibold">Caption:</h2>
          <p>{result.caption}</p>
          <h2 className="text-lg font-semibold mt-2">Post Text:</h2>
          <p>{result.postText}</p>
        </div>
      )}
    </div>
  );
}
