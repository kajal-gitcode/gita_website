import { useParams, Link } from "react-router-dom";
import verseData from "../data/verse.json";
import Fuse from "fuse.js";
import { doubleMetaphone } from "double-metaphone";

//  Normalize text (lowercase + remove diacritics)
function normalize(str) {
  return str
    ?.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

//  Highlight matches in UI (direct substring highlight only)
function highlightMatches(text, query) {
  if (!text || !query) return text;
  const lowerQuery = normalize(query);

// Make a Fuse instance for this text
  const words = text.split(/\s+/);
  const fuse = new Fuse(words, { includeScore: true, threshold: 0.4 });

 
  return text.split(/(\s+)/).map((word, i) => {
    const cleanWord = normalize(word.replace(/[^\w]/g, ""));
    let isDirect = cleanWord.includes(lowerQuery);

    let isPhonetic = false;
    if (!isDirect && lowerQuery) {
      const [q1, q2] = doubleMetaphone(lowerQuery);
      const [w1, w2] = doubleMetaphone(cleanWord);
      isPhonetic = (q1 && (q1 === w1 || q1 === w2)) || (q2 && (q2 === w1 || q2 === w2));
    }

    let isFuzzy = false;
    if (!isDirect && !isPhonetic) {
      const results = fuse.search(query, { limit: 1 });
      isFuzzy = results.some(r => normalize(r.item) === cleanWord);
    }
    if (isDirect || isPhonetic || isFuzzy) {
    
      return (
        <span key={i}>
          <mark className="bg-yellow-100">{word}</mark>
        </span>
      );
    }
    return <span key={i}>{word}</span>;
  });
}

function SearchResults() {
  const { query } = useParams();
  const decodedQuery = decodeURIComponent(query);
  const normalizedQuery = normalize(decodedQuery);

  //  Step 1: Direct substring match
  const directMatches = verseData.filter((v) =>
    normalize(v.word_meanings || "").includes(normalizedQuery)
  );

  //  Step 2: Phonetic matches
  const [q1, q2] = doubleMetaphone(normalizedQuery);
  const phoneticMatches = verseData.filter((v) => {
    const [t1, t2] = doubleMetaphone(normalize(v.word_meanings || ""));
    return q1 === t1 || q1 === t2 || q2 === t1 || q2 === t2;
  });

  //  Step 3: Fuzzy matches
  const fuse = new Fuse(
    verseData.map((v) => ({
      ...v,
      _normalized: normalize(v.word_meanings || ""), // add normalized field
    })),
    {
      keys: ["_normalized"],
      threshold: 0.4, // typo tolerance
    }
  );
  const fuzzyMatches = fuse.search(normalizedQuery).map((r) => r.item);

  //  Combine all results & remove duplicates
  const seen = new Set();
  const results = [...directMatches, ...phoneticMatches, ...fuzzyMatches].filter(
    (v) => {
      const key = `${v.chapter_number}-${v.verse_number}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }
  );

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        Search results for "{decodedQuery}"
      </h2>

      {results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <ul className="space-y-4">
          {results.map((v, i) => (
            <li
              key={i}
              className="border p-4 rounded shadow bg-white hover:shadow-md transition"
            >
              <h3 className="font-semibold text-lg mb-2">
                Chapter {v.chapter_number}, Verse {v.verse_number}
              </h3>

              {/* Sanskrit verse text */}
              <p className="text-gray-800 mb-2">{v.text}</p>

              {/* Transliteration */}
              <p className="italic text-gray-600 mb-2">
                {v.transliteration}
              </p>

              {/* English meaning */}
              <p className="text-gray-700 mb-2">{v.meaning}</p>

              {/* Highlighted word meanings */}
              <p className="text-sm text-gray-500">
                <strong>Word Meanings:</strong>{" "}
                {highlightMatches(v.word_meanings, decodedQuery)}
              </p>

              {/* Link to verse page */}
              <Link
                to={`/chapter/${v.chapter_number}/verse/${v.verse_number}`}
                className="text-blue-500 hover:underline mt-2 inline-block"
              >
                View Verse →
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchResults;
