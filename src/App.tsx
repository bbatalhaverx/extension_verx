import React, { useState } from 'react';
import { Briefcase, Loader } from 'lucide-react';
import axios from 'axios';

function App() {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    setResult(null);
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      const response = await chrome.tabs.sendMessage(tab.id!, { action: 'scrapeProfile' });
      
      // Send data to Make webhook
      const makeWebhookUrl = 'https://hook.us2.make.com/4lwms322ygj2oxm39v32ommtd715y49d';
      const makeResponse = await axios.post(makeWebhookUrl, {
        profile: response.profile
      });
      
      setResult(makeResponse.data.result);
    } catch (error) {
      console.error('Error:', error);
      setResult('An error occurred during analysis.');
    }
    setLoading(false);
  };

  return (
    <div className="w-80 p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-xl font-bold mb-4 text-gray-800 flex items-center justify-center">
        <Briefcase className="mr-2" /> LinkedIn Job Matcher
      </h1>
      <button
        onClick={handleAnalyze}
        disabled={loading}
        className={`w-full py-2 px-4 rounded-md text-white font-semibold ${
          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        } flex items-center justify-center`}
      >
        {loading ? (
          <>
            <Loader className="animate-spin mr-2" />
            Analyzing...
          </>
        ) : (
          'Analyze Profile'
        )}
      </button>
      {result && (
        <div className="mt-4 p-3 bg-gray-100 rounded-md">
          <h2 className="text-lg font-semibold mb-2">Result:</h2>
          <p className="text-gray-700">{result}</p>
        </div>
      )}
    </div>
  );
}

export default App;