const pool = require('../db');
const parser = require('../utils/parser');

exports.getVerses = async (query) => {
  const searchParams = parser.parseQuery(query);

  let verses = [];
  for (const param of searchParams) {
    const { book, chapter, verses: verseNumbers } = param;
    const results = await pool.query(
      'SELECT * FROM bible WHERE book = $1 AND chapter = $2 AND verse = ANY($3::int[]) ORDER BY id ASC',
      [book, chapter, verseNumbers]
    );
    verses = verses.concat(results.rows);
  }

  return verses;
};
