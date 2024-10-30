// components/VersesWithBookChapter.js
'use client';

import CopyButton from './CopyButton';

export default function VersesWithBookChapter({ verses }) {
  // Prepare the text to copy
  const textToCopy = verses
    .map(
      (verse) =>
        `${verse.book} ${verse.chapter}:${verse.verse} ${verse.content_kor}`
    )
    .join('\n');

  return (
    <>
      <CopyButton textToCopy={textToCopy} />
      {verses.map((verse) => (
        <div key={verse.id} className='mb-4'>
          <p className='text-lg'>
            <strong>
              {verse.book} {verse.chapter}:{verse.verse}
            </strong>{' '}
            {verse.content_kor}
          </p>
        </div>
      ))}
    </>
  );
}
