'use client';

import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import DisplayOptions from '../components/DisplayOptions';
import VersesWithBookChapter from '@/components/VersesWithBookChapter';
import TextOnlyVerses from '@/components/TextOnlyVerses';
import axios from 'axios';

export default function Home() {
  const [verses, setVerses] = useState([]);
  const [displayOption, setDisplayOption] = useState('withBookChapter');

  const handleSearch = async (query) => {
    try {
      const response = await axios.get('/api/search', {
        params: { query },
      });
      setVerses(response.data);
    } catch (error) {
      console.error('Error fetching verses:', error);
    }
  };

  return (
    <div className='max-w-3xl mx-auto p-6'>
      <h1 className='text-3xl font-bold mb-6'>Bible Search App</h1>
      <SearchBar onSearch={handleSearch} />
      <DisplayOptions
        displayOption={displayOption}
        setDisplayOption={setDisplayOption}
      />
      <div className='mt-6'>
        {displayOption === 'withBookChapter' ? (
          <VersesWithBookChapter verses={verses} />
        ) : (
          <TextOnlyVerses verses={verses} />
        )}
      </div>
    </div>
  );
}
