// components/DisplayOptions.js
'use client';

export default function DisplayOptions({ displayOption, setDisplayOption }) {
  return (
    <div className='mb-4'>
      <label className='mr-4'>
        <input
          type='radio'
          name='displayOption'
          value='withBookChapter'
          checked={displayOption === 'withBookChapter'}
          onChange={(e) => setDisplayOption(e.target.value)}
          className='mr-1'
        />
        장과 절 표시
      </label>
      <label>
        <input
          type='radio'
          name='displayOption'
          value='textOnly'
          checked={displayOption === 'textOnly'}
          onChange={(e) => setDisplayOption(e.target.value)}
          className='mr-1'
        />
        장과 절 합치기(말씀 구절만 표시)
      </label>
    </div>
  );
}
