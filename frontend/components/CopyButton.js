'use client';

import { useState } from 'react';

export default function CopyButton({ textToCopy }) {
  const [copySuccess, setCopySuccess] = useState('');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopySuccess('Copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
      setCopySuccess('Failed to copy.');
    }

    // Clear the message after 2 seconds
    setTimeout(() => setCopySuccess(''), 2000);
  };

  return (
    <div className='mb-4 flex items-center'>
      <button
        onClick={handleCopy}
        className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'
        aria-label='Copy verses to clipboard'
        role='button'
      >
        Copy
      </button>
      {copySuccess && (
        <p className='text-green-600 ml-4 mt-2 font-medium'>{copySuccess}</p>
      )}
    </div>
  );
}
