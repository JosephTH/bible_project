// components/SearchBar.js
'use client';

import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [input, setInput] = useState('');
  const maxLength = 50;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(input);
  };

  const handleChange = (e) => {
    setInput(e.target.value.slice(0, maxLength));
  };

  const isLimitReached = input.length >= maxLength;

  return (
    <form onSubmit={handleSubmit} className='relative mb-4'>
      <div className='relative'>
        <textarea
          placeholder='말씀 구절을 입력해주세요.(예시: 갈 5:20, 엡 2:21,22,24, 롬 1:20-25)'
          value={input}
          onChange={handleChange}
          required
          className={`w-full resize-none px-4 py-2 border ${
            isLimitReached ? 'border-red-500' : 'border-gray-300'
          } rounded focus:outline-none ${
            isLimitReached ? 'focus:border-red-500' : 'focus:border-blue-500'
          } max-h-[200px] overflow-y-auto`}
          style={{ minHeight: '80px' }}
        ></textarea>
        <div className='absolute bottom-2 right-4 text-sm text-gray-500 pointer-events-none'>
          {input.length}/{maxLength}
        </div>
      </div>
      <button
        type='submit'
        className='mt-2 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600'
      >
        검색
      </button>
    </form>
  );
}
