export function groupVerses(verses) {
  // Sort verses by book, chapter, and verse number
  //const sortedVerses = [...verses].sort((a, b) => {
  //  if (a.book !== b.book) return a.book.localeCompare(b.book);
  //  if (a.chapter !== b.chapter) return a.chapter - b.chapter;
  //  return a.verse - b.verse;
  //});

  const grouped = [];

  verses.forEach((verse) => {
    const lastGroup = grouped[grouped.length - 1];

    if (
      lastGroup &&
      lastGroup.book === verse.book &&
      lastGroup.chapter === verse.chapter
    ) {
      lastGroup.verses.push(verse);
      lastGroup.content_kor += ' ' + verse.content_kor;
    } else {
      grouped.push({
        book: verse.book,
        chapter: verse.chapter,
        verses: [verse],
        content_kor: verse.content_kor,
      });
    }
  });

  console.log(grouped);
  // Format verse numbers and return the grouped data
  return grouped.map((group) => {
    const verseNumbers = formatVerseNumbers(group.verses.map((v) => v.verse));
    return {
      book: group.book,
      chapter: group.chapter,
      verseNumbers,
      content_kor: group.content_kor.trim(),
    };
  });
}

function formatVerseNumbers(verses) {
  verses.sort((a, b) => a - b);
  const ranges = [];
  let start = verses[0];
  let end = verses[0];

  for (let i = 1; i <= verses.length; i++) {
    if (verses[i] === end + 1) {
      end = verses[i];
    } else {
      if (start === end) {
        ranges.push(`${start}`);
      } else {
        ranges.push(`${start}-${end}`);
      }
      start = verses[i];
      end = verses[i];
    }
  }

  return ranges.join(',');
}
