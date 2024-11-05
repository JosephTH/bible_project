const bookMap = {
  창: '창세기',
  출: '출애굽기',
  레: '레위기',
  민: '민수기',
  신: '신명기',
  수: '여호수아',
  삿: '사사기',
  룻: '룻기',
  삼상: '사무엘상',
  삼하: '사무엘하',
  왕상: '열왕기상',
  왕하: '열왕기하',
  대상: '역대기상',
  대하: '역대기하',
  스: '에스라기',
  느: '느헤미야기',
  에: '에스더',
  욥: '욥기',
  시: '시편',
  잠: '잠언',
  전: '전도서',
  아: '아가',
  사: '이사야서',
  렘: '예레미야서',
  애: '예레미야애가',
  겔: '에스겔서',
  단: '다니엘서',
  호: '호세아서',
  욜: '요엘',
  암: '아모스',
  옵: '오바댜',
  욘: '요나',
  미: '미가',
  나: '나훔',
  합: '하박국',
  습: '스바냐',
  학: '학개',
  슥: '스가랴서',
  말: '말라기',
  마: '마태복음',
  막: '마가복음',
  눅: '누가복음',
  요: '요한복음',
  행: '사도행전',
  롬: '로마서',
  고전: '고린도전서',
  고후: '고린도후서',
  갈: '갈라디아서',
  엡: '에베소서',
  빌: '빌립보서',
  골: '골로새서',
  살전: '데살로니가전서',
  살후: '데살로니가후서',
  딤전: '디모데전서',
  딤후: '디모데후서',
  딛: '디도서',
  몬: '빌레몬서',
  히: '히브리서',
  약: '야고보서',
  벧전: '베드로전서',
  벧후: '베드로후서',
  요일: '요한일서',
  요이: '요한이서',
  요삼: '요한삼서',
  유: '유다서',
  계: '요한계시록',
};

exports.parseQuery = (query) => {
  const searchParams = [];
  let currentBook = null;
  let currentChapter = null;

  // Split the query by commas, as commas separate tokens
  const tokens = query.split(',');

  for (const token of tokens) {
    const trimmedToken = token.trim();

    // Regular expressions for different patterns
    // Pattern A: BookChapter:Verses (e.g., "Gal5:20", "Gal 5:20")
    const patternA =
      /^(?<bookChapter>[1-3]?\s*[가-힣]+\s*\d+)\s*:\s*(?<verses>.+)$/;
    // Pattern B: Chapter:Verses (e.g., "4:20")
    const patternB = /^(?<chapter>\d+)\s*:\s*(?<verses>.+)$/;
    // Pattern C: Verses only (e.g., "21,22,24")
    const patternC = /^(?<verses>.+)$/;

    let match;

    // Try to match Pattern A
    if ((match = trimmedToken.match(patternA))) {
      const bookChapterStr = match.groups.bookChapter.replace(/\s/g, '');
      const versesPart = match.groups.verses;

      const { book, chapter } = extractBookAndChapter(bookChapterStr);

      currentBook = book;
      currentChapter = chapter;

      searchParams.push({
        book: currentBook,
        chapter: currentChapter,
        verses: parseVerses(versesPart),
      });

      continue;
    }

    // Try to match Pattern B
    if ((match = trimmedToken.match(patternB))) {
      if (!currentBook) {
        throw new Error('Chapter specified without a book');
      }

      currentChapter = parseInt(match.groups.chapter, 10);
      const versesPart = match.groups.verses;

      searchParams.push({
        book: currentBook,
        chapter: currentChapter,
        verses: parseVerses(versesPart),
      });

      continue;
    }

    // Try to match Pattern C
    if ((match = trimmedToken.match(patternC))) {
      if (!currentBook || !currentChapter) {
        throw new Error('Verses specified without a book and chapter');
      }

      const versesPart = match.groups.verses;

      searchParams.push({
        book: currentBook,
        chapter: currentChapter,
        verses: parseVerses(versesPart),
      });

      continue;
    }

    // If none of the patterns match, throw an error or skip
    throw new Error(`Unable to parse token: '${trimmedToken}'`);
  }

  return searchParams;
};

function extractBookAndChapter(bookChapterStr) {
  // Remove all spaces from the string
  const str = bookChapterStr.replace(/\s/g, '');
  const match = str.match(/^([1-3]?[가-힣]+)(\d+)$/);

  if (match) {
    const bookAbbr = match[1];
    const book = bookMap[bookAbbr] || bookAbbr;
    const chapter = parseInt(match[2], 10);
    return { book, chapter };
  } else {
    throw new Error(
      `Unable to parse book and chapter from '${bookChapterStr}'`
    );
  }
}

function parseVerses(versesStr) {
  const verses = [];
  const parts = versesStr.split(',');

  for (const part of parts) {
    if (part.includes('-')) {
      const [startStr, endStr] = part
        .trim()
        .split('-')
        .map((s) => s.trim());
      const start = parseInt(startStr, 10);
      const end = parseInt(endStr, 10);
      if (isNaN(start) || isNaN(end)) {
        continue;
      }
      for (let i = start; i <= end; i++) {
        verses.push(i);
      }
    } else {
      const verse = parseInt(part.trim(), 10);
      if (isNaN(verse)) {
        continue;
      }
      verses.push(verse);
    }
  }

  return verses;
}
