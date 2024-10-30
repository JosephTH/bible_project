const bibleService = require('../services/bibleService');

exports.searchVerses = async (req, res) => {
  try {
    const query = req.query.query;
    const verses = await bibleService.getVerses(query);
    res.json(verses);
  } catch (error) {
    console.error('Error in bibleController:', error);
    res.status(500).send('Server Error');
  }
};
