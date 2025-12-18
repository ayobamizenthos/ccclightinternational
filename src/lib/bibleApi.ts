// Complete Bible API with all 66 books and chapter counts
export const bibleStructure = {
  // Old Testament - 39 books
  'Genesis': 50, 'Exodus': 40, 'Leviticus': 27, 'Numbers': 36, 'Deuteronomy': 34,
  'Joshua': 24, 'Judges': 21, 'Ruth': 4, '1 Samuel': 31, '2 Samuel': 24,
  '1 Kings': 22, '2 Kings': 25, '1 Chronicles': 29, '2 Chronicles': 36, 'Ezra': 10,
  'Nehemiah': 13, 'Esther': 10, 'Job': 42, 'Psalms': 150, 'Proverbs': 31,
  'Ecclesiastes': 12, 'Song of Solomon': 8, 'Isaiah': 66, 'Jeremiah': 52, 'Lamentations': 5,
  'Ezekiel': 48, 'Daniel': 12, 'Hosea': 14, 'Joel': 3, 'Amos': 9,
  'Obadiah': 1, 'Jonah': 4, 'Micah': 7, 'Nahum': 3, 'Habakkuk': 3,
  'Zephaniah': 3, 'Haggai': 2, 'Zechariah': 14, 'Malachi': 4,
  // New Testament - 27 books
  'Matthew': 28, 'Mark': 16, 'Luke': 24, 'John': 21, 'Acts': 28,
  'Romans': 16, '1 Corinthians': 16, '2 Corinthians': 13, 'Galatians': 6, 'Ephesians': 6,
  'Philippians': 4, 'Colossians': 4, '1 Thessalonians': 5, '2 Thessalonians': 3, '1 Timothy': 6,
  '2 Timothy': 4, 'Titus': 3, 'Philemon': 1, 'Hebrews': 13, 'James': 5,
  '1 Peter': 5, '2 Peter': 3, '1 John': 5, '2 John': 1, '3 John': 1,
  'Jude': 1, 'Revelation': 22
} as const;

export const oldTestamentBooks = [
  'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy',
  'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel',
  '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles', 'Ezra',
  'Nehemiah', 'Esther', 'Job', 'Psalms', 'Proverbs',
  'Ecclesiastes', 'Song of Solomon', 'Isaiah', 'Jeremiah', 'Lamentations',
  'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos',
  'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk',
  'Zephaniah', 'Haggai', 'Zechariah', 'Malachi'
];

export const newTestamentBooks = [
  'Matthew', 'Mark', 'Luke', 'John', 'Acts',
  'Romans', '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians',
  'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians', '1 Timothy',
  '2 Timothy', 'Titus', 'Philemon', 'Hebrews', 'James',
  '1 Peter', '2 Peter', '1 John', '2 John', '3 John',
  'Jude', 'Revelation'
];

// Book abbreviations for API
const bookAbbreviations: Record<string, string> = {
  'Genesis': 'GEN', 'Exodus': 'EXO', 'Leviticus': 'LEV', 'Numbers': 'NUM', 'Deuteronomy': 'DEU',
  'Joshua': 'JOS', 'Judges': 'JDG', 'Ruth': 'RUT', '1 Samuel': '1SA', '2 Samuel': '2SA',
  '1 Kings': '1KI', '2 Kings': '2KI', '1 Chronicles': '1CH', '2 Chronicles': '2CH', 'Ezra': 'EZR',
  'Nehemiah': 'NEH', 'Esther': 'EST', 'Job': 'JOB', 'Psalms': 'PSA', 'Proverbs': 'PRO',
  'Ecclesiastes': 'ECC', 'Song of Solomon': 'SNG', 'Isaiah': 'ISA', 'Jeremiah': 'JER', 'Lamentations': 'LAM',
  'Ezekiel': 'EZK', 'Daniel': 'DAN', 'Hosea': 'HOS', 'Joel': 'JOL', 'Amos': 'AMO',
  'Obadiah': 'OBA', 'Jonah': 'JON', 'Micah': 'MIC', 'Nahum': 'NAM', 'Habakkuk': 'HAB',
  'Zephaniah': 'ZEP', 'Haggai': 'HAG', 'Zechariah': 'ZEC', 'Malachi': 'MAL',
  'Matthew': 'MAT', 'Mark': 'MRK', 'Luke': 'LUK', 'John': 'JHN', 'Acts': 'ACT',
  'Romans': 'ROM', '1 Corinthians': '1CO', '2 Corinthians': '2CO', 'Galatians': 'GAL', 'Ephesians': 'EPH',
  'Philippians': 'PHP', 'Colossians': 'COL', '1 Thessalonians': '1TH', '2 Thessalonians': '2TH', '1 Timothy': '1TI',
  '2 Timothy': '2TI', 'Titus': 'TIT', 'Philemon': 'PHM', 'Hebrews': 'HEB', 'James': 'JAS',
  '1 Peter': '1PE', '2 Peter': '2PE', '1 John': '1JN', '2 John': '2JN', '3 John': '3JN',
  'Jude': 'JUD', 'Revelation': 'REV'
};

export interface BibleVerse {
  verse: number;
  text: string;
}

// Cache for Bible verses
const verseCache: Record<string, BibleVerse[]> = {};

// Fetch verses from Bible API
export const fetchVerses = async (book: string, chapter: number): Promise<BibleVerse[]> => {
  const cacheKey = `${book}-${chapter}`;
  
  if (verseCache[cacheKey]) {
    return verseCache[cacheKey];
  }

  const abbr = bookAbbreviations[book];
  if (!abbr) {
    console.error('Unknown book:', book);
    return [];
  }

  try {
    // Using bible-api.com which is free and doesn't require API keys
    const response = await fetch(`https://bible-api.com/${encodeURIComponent(book)}+${chapter}?translation=kjv`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.verses && Array.isArray(data.verses)) {
      const verses: BibleVerse[] = (data.verses as Array<{ verse: number; text: string }>).map((v) => ({
        verse: v.verse,
        text: v.text.trim()
      }));
      
      verseCache[cacheKey] = verses;
      return verses;
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching verses:', error);
    // Return placeholder verses if API fails
    return Array.from({ length: 10 }, (_, i) => ({
      verse: i + 1,
      text: `Loading ${book} ${chapter}:${i + 1}...`
    }));
  }
};

// Get random verse for daily devotionals
export const getRandomVerse = async (): Promise<{ reference: string; text: string }> => {
  const popularVerses = [
    { book: 'John', chapter: 3, verse: 16 },
    { book: 'Psalms', chapter: 23, verse: 1 },
    { book: 'Proverbs', chapter: 3, verse: 5 },
    { book: 'Romans', chapter: 8, verse: 28 },
    { book: 'Philippians', chapter: 4, verse: 13 },
    { book: 'Isaiah', chapter: 40, verse: 31 },
    { book: 'Jeremiah', chapter: 29, verse: 11 },
    { book: 'Matthew', chapter: 11, verse: 28 },
    { book: '1 Corinthians', chapter: 13, verse: 4 },
    { book: 'Galatians', chapter: 5, verse: 22 },
  ];
  
  const random = popularVerses[Math.floor(Math.random() * popularVerses.length)];
  const verses = await fetchVerses(random.book, random.chapter);
  const verse = verses.find(v => v.verse === random.verse);
  
  return {
    reference: `${random.book} ${random.chapter}:${random.verse}`,
    text: verse?.text || 'For God so loved the world...'
  };
};

// Full-text search cache for Bible content
const searchCache: Record<string, BibleVerse[]> = {};

// Comprehensive Bible search - searches through verses, books, and content
export const searchBible = async (query: string): Promise<{ reference: string; text: string; book?: string; chapter?: number }[]> => {
  if (!query.trim()) return [];
  
  const normalizedQuery = query.toLowerCase().trim();
  const results: { reference: string; text: string; book?: string; chapter?: number }[] = [];
  
  // 1. First try reference-based search (e.g., "John 3:16", "Genesis 1")
  try {
    const response = await fetch(`https://bible-api.com/${encodeURIComponent(query)}?translation=kjv`);
    if (response.ok) {
      const data = await response.json();
      if (data.verses && data.verses.length > 0) {
        data.verses.forEach((v: { book_name: string; chapter: number; verse: number; text: string }) => {
          results.push({
            reference: `${v.book_name} ${v.chapter}:${v.verse}`,
            text: v.text.trim(),
            book: v.book_name,
            chapter: v.chapter
          });
        });
      }
    }
  } catch (e) {
    // Continue to text search
  }
  
  // 2. Search through popular/common verses by keyword
  const popularSearchVerses = [
    // Love verses
    { book: 'John', chapter: 3, verse: 16, text: 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.' },
    { book: '1 Corinthians', chapter: 13, verse: 4, text: 'Charity suffereth long, and is kind; charity envieth not; charity vaunteth not itself, is not puffed up,' },
    { book: '1 Corinthians', chapter: 13, verse: 13, text: 'And now abideth faith, hope, charity, these three; but the greatest of these is charity.' },
    { book: '1 John', chapter: 4, verse: 8, text: 'He that loveth not knoweth not God; for God is love.' },
    { book: 'Romans', chapter: 8, verse: 28, text: 'And we know that all things work together for good to them that love God, to them who are the called according to his purpose.' },
    // Faith verses
    { book: 'Hebrews', chapter: 11, verse: 1, text: 'Now faith is the substance of things hoped for, the evidence of things not seen.' },
    { book: 'Romans', chapter: 10, verse: 17, text: 'So then faith cometh by hearing, and hearing by the word of God.' },
    { book: 'James', chapter: 2, verse: 26, text: 'For as the body without the spirit is dead, so faith without works is dead also.' },
    { book: 'Mark', chapter: 11, verse: 24, text: 'Therefore I say unto you, What things soever ye desire, when ye pray, believe that ye receive them, and ye shall have them.' },
    // Strength/Courage
    { book: 'Philippians', chapter: 4, verse: 13, text: 'I can do all things through Christ which strengtheneth me.' },
    { book: 'Isaiah', chapter: 40, verse: 31, text: 'But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.' },
    { book: 'Joshua', chapter: 1, verse: 9, text: 'Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest.' },
    { book: 'Deuteronomy', chapter: 31, verse: 6, text: 'Be strong and of a good courage, fear not, nor be afraid of them: for the LORD thy God, he it is that doth go with thee; he will not fail thee, nor forsake thee.' },
    // Peace
    { book: 'Philippians', chapter: 4, verse: 6, text: 'Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God.' },
    { book: 'Philippians', chapter: 4, verse: 7, text: 'And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus.' },
    { book: 'John', chapter: 14, verse: 27, text: 'Peace I leave with you, my peace I give unto you: not as the world giveth, give I unto you. Let not your heart be troubled, neither let it be afraid.' },
    { book: 'Isaiah', chapter: 26, verse: 3, text: 'Thou wilt keep him in perfect peace, whose mind is stayed on thee: because he trusteth in thee.' },
    // Hope/Promise
    { book: 'Jeremiah', chapter: 29, verse: 11, text: 'For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.' },
    { book: 'Romans', chapter: 8, verse: 38, text: 'For I am persuaded, that neither death, nor life, nor angels, nor principalities, nor powers, nor things present, nor things to come,' },
    { book: 'Romans', chapter: 8, verse: 39, text: 'Nor height, nor depth, nor any other creature, shall be able to separate us from the love of God, which is in Christ Jesus our Lord.' },
    { book: 'Proverbs', chapter: 3, verse: 5, text: 'Trust in the LORD with all thine heart; and lean not unto thine own understanding.' },
    { book: 'Proverbs', chapter: 3, verse: 6, text: 'In all thy ways acknowledge him, and he shall direct thy paths.' },
    // Wisdom
    { book: 'James', chapter: 1, verse: 5, text: 'If any of you lack wisdom, let him ask of God, that giveth to all men liberally, and upbraideth not; and it shall be given him.' },
    { book: 'Proverbs', chapter: 1, verse: 7, text: 'The fear of the LORD is the beginning of knowledge: but fools despise wisdom and instruction.' },
    { book: 'Proverbs', chapter: 4, verse: 7, text: 'Wisdom is the principal thing; therefore get wisdom: and with all thy getting get understanding.' },
    // Salvation
    { book: 'Romans', chapter: 3, verse: 23, text: 'For all have sinned, and come short of the glory of God;' },
    { book: 'Romans', chapter: 6, verse: 23, text: 'For the wages of sin is death; but the gift of God is eternal life through Jesus Christ our Lord.' },
    { book: 'Romans', chapter: 10, verse: 9, text: 'That if thou shalt confess with thy mouth the Lord Jesus, and shalt believe in thine heart that God hath raised him from the dead, thou shalt be saved.' },
    { book: 'Ephesians', chapter: 2, verse: 8, text: 'For by grace are ye saved through faith; and that not of yourselves: it is the gift of God:' },
    { book: 'Ephesians', chapter: 2, verse: 9, text: 'Not of works, lest any man should boast.' },
    { book: 'Acts', chapter: 4, verse: 12, text: 'Neither is there salvation in any other: for there is none other name under heaven given among men, whereby we must be saved.' },
    // Prayer
    { book: 'Matthew', chapter: 6, verse: 9, text: 'After this manner therefore pray ye: Our Father which art in heaven, Hallowed be thy name.' },
    { book: 'Matthew', chapter: 7, verse: 7, text: 'Ask, and it shall be given you; seek, and ye shall find; knock, and it shall be opened unto you:' },
    { book: '1 Thessalonians', chapter: 5, verse: 17, text: 'Pray without ceasing.' },
    { book: 'Psalm', chapter: 23, verse: 1, text: 'The LORD is my shepherd; I shall not want.' },
    { book: 'Psalms', chapter: 23, verse: 4, text: 'Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me.' },
    { book: 'Psalms', chapter: 46, verse: 1, text: 'God is our refuge and strength, a very present help in trouble.' },
    { book: 'Psalms', chapter: 119, verse: 105, text: 'Thy word is a lamp unto my feet, and a light unto my path.' },
    { book: 'Psalms', chapter: 27, verse: 1, text: 'The LORD is my light and my salvation; whom shall I fear? the LORD is the strength of my life; of whom shall I be afraid?' },
    // Comfort
    { book: 'Matthew', chapter: 11, verse: 28, text: 'Come unto me, all ye that labour and are heavy laden, and I will give you rest.' },
    { book: 'Psalm', chapter: 34, verse: 18, text: 'The LORD is nigh unto them that are of a broken heart; and saveth such as be of a contrite spirit.' },
    { book: '2 Corinthians', chapter: 1, verse: 3, text: 'Blessed be God, even the Father of our Lord Jesus Christ, the Father of mercies, and the God of all comfort;' },
    // God's Word
    { book: '2 Timothy', chapter: 3, verse: 16, text: 'All scripture is given by inspiration of God, and is profitable for doctrine, for reproof, for correction, for instruction in righteousness:' },
    { book: 'Hebrews', chapter: 4, verse: 12, text: 'For the word of God is quick, and powerful, and sharper than any twoedged sword, piercing even to the dividing asunder of soul and spirit, and of the joints and marrow, and is a discerner of the thoughts and intents of the heart.' },
    // Creation
    { book: 'Genesis', chapter: 1, verse: 1, text: 'In the beginning God created the heaven and the earth.' },
    { book: 'Genesis', chapter: 1, verse: 27, text: 'So God created man in his own image, in the image of God created he him; male and female created he them.' },
    // Jesus
    { book: 'John', chapter: 1, verse: 1, text: 'In the beginning was the Word, and the Word was with God, and the Word was God.' },
    { book: 'John', chapter: 1, verse: 14, text: 'And the Word was made flesh, and dwelt among us, (and we beheld his glory, the glory as of the only begotten of the Father,) full of grace and truth.' },
    { book: 'John', chapter: 14, verse: 6, text: 'Jesus saith unto him, I am the way, the truth, and the life: no man cometh unto the Father, but by me.' },
    { book: 'John', chapter: 11, verse: 25, text: 'Jesus said unto her, I am the resurrection, and the life: he that believeth in me, though he were dead, yet shall he live:' },
    // Forgiveness
    { book: '1 John', chapter: 1, verse: 9, text: 'If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness.' },
    { book: 'Colossians', chapter: 3, verse: 13, text: 'Forbearing one another, and forgiving one another, if any man have a quarrel against any: even as Christ forgave you, so also do ye.' },
    // Holy Spirit
    { book: 'Acts', chapter: 1, verse: 8, text: 'But ye shall receive power, after that the Holy Ghost is come upon you: and ye shall be witnesses unto me both in Jerusalem, and in all Judaea, and in Samaria, and unto the uttermost part of the earth.' },
    { book: 'Galatians', chapter: 5, verse: 22, text: 'But the fruit of the Spirit is love, joy, peace, longsuffering, gentleness, goodness, faith,' },
    { book: 'Galatians', chapter: 5, verse: 23, text: 'Meekness, temperance: against such there is no law.' },
    // More popular verses
    { book: 'Matthew', chapter: 5, verse: 14, text: 'Ye are the light of the world. A city that is set on an hill cannot be hid.' },
    { book: 'Matthew', chapter: 28, verse: 19, text: 'Go ye therefore, and teach all nations, baptizing them in the name of the Father, and of the Son, and of the Holy Ghost:' },
    { book: 'Matthew', chapter: 28, verse: 20, text: 'Teaching them to observe all things whatsoever I have commanded you: and, lo, I am with you always, even unto the end of the world. Amen.' },
    { book: 'Revelation', chapter: 3, verse: 20, text: 'Behold, I stand at the door, and knock: if any man hear my voice, and open the door, I will come in to him, and will sup with him, and he with me.' },
    { book: 'Revelation', chapter: 21, verse: 4, text: 'And God shall wipe away all tears from their eyes; and there shall be no more death, neither sorrow, nor crying, neither shall there be any more pain: for the former things are passed away.' },
  ];
  
  // Search through popular verses
  const keywords = normalizedQuery.split(/\s+/).filter(w => w.length > 2);
  
  popularSearchVerses.forEach(v => {
    const textLower = v.text.toLowerCase();
    const refLower = `${v.book} ${v.chapter}:${v.verse}`.toLowerCase();
    const bookLower = v.book.toLowerCase();
    
    // Check if query matches text, reference, or book name
    const matches = 
      textLower.includes(normalizedQuery) || 
      refLower.includes(normalizedQuery) ||
      bookLower.includes(normalizedQuery) ||
      keywords.some(kw => textLower.includes(kw));
    
    if (matches) {
      const ref = `${v.book} ${v.chapter}:${v.verse}`;
      // Avoid duplicates
      if (!results.some(r => r.reference === ref)) {
        results.push({
          reference: ref,
          text: v.text,
          book: v.book,
          chapter: v.chapter
        });
      }
    }
  });
  
  // 3. Search book names - if query matches a book name, suggest that book
  const allBooksArray = [...oldTestamentBooks, ...newTestamentBooks];
  allBooksArray.forEach(book => {
    if (book.toLowerCase().includes(normalizedQuery)) {
      // Check if we already have results from this book
      const hasBookResults = results.some(r => r.book?.toLowerCase() === book.toLowerCase());
      if (!hasBookResults) {
        results.push({
          reference: `${book} (Book)`,
          text: `Tap to read the book of ${book}`,
          book: book,
          chapter: 1
        });
      }
    }
  });
  
  // Sort results by relevance - exact matches first
  results.sort((a, b) => {
    const aExact = a.reference.toLowerCase().includes(normalizedQuery) || a.text.toLowerCase().startsWith(normalizedQuery);
    const bExact = b.reference.toLowerCase().includes(normalizedQuery) || b.text.toLowerCase().startsWith(normalizedQuery);
    if (aExact && !bExact) return -1;
    if (!aExact && bExact) return 1;
    return 0;
  });
  
  return results.slice(0, 50); // Limit to 50 results
};

// Search through Bible stories
export const searchBibleStories = (query: string, stories: Array<{ id: number; title: string; reference: string; description: string; book: string; chapter: number }>): typeof stories => {
  if (!query.trim()) return stories;
  
  const normalizedQuery = query.toLowerCase().trim();
  const keywords = normalizedQuery.split(/\s+/).filter(w => w.length > 2);
  
  return stories.filter(story => {
    const searchText = `${story.title} ${story.description} ${story.reference} ${story.book}`.toLowerCase();
    return searchText.includes(normalizedQuery) || keywords.some(kw => searchText.includes(kw));
  });
};

// Reading plans
export const readingPlans = {
  'one-year': {
    name: 'One Year Bible',
    description: 'Read the entire Bible in one year',
    dailyChapters: 3
  },
  'chronological': {
    name: 'Chronological',
    description: 'Read the Bible in historical order',
    dailyChapters: 4
  },
  'gospels': {
    name: 'Gospels First',
    description: 'Start with the life of Jesus',
    dailyChapters: 2
  },
  'psalms-proverbs': {
    name: 'Psalms & Proverbs',
    description: 'Daily wisdom and worship',
    dailyChapters: 2
  }
};
