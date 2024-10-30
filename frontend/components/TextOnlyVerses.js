/* eslint-disable react/prop-types */
'use client';

import CopyButton from './CopyButton';
import { groupVerses } from '../utils/groupVerses';

export default function TextOnlyVerses({ verses }) {
  const groupedVerses = groupVerses(verses);

  // Prepare the text to copy
  const textToCopy = groupedVerses
    .map(
      (group) =>
        `${group.book} ${group.chapter}:${group.verseNumbers} ${group.content_kor}`
    )
    .join('\n');

  return (
    <>
      <CopyButton textToCopy={textToCopy} />
      {groupedVerses.map((group, index) => (
        <div key={index} className='mb-4'>
          <p className='text-lg'>
            <strong>
              {group.book} {group.chapter}:{group.verseNumbers}
            </strong>{' '}
            {group.content_kor}
          </p>
        </div>
      ))}
    </>
  );
}
