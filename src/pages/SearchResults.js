import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import verseData from "../data/verse.json";

const SearchResults = () => {
  const { query } = useParams();
  const navigate = useNavigate();
  const lowerQ = decodeURIComponent(query).toLowerCase();

  // filter verses
  const results = verseData.filter((verse) => {
    const text = `${verse.text} ${verse.transliteration} ${verse.word_meanings}`.toLowerCase();
    return text.includes(lowerQ);
  });

  const handleClick = (verse) => {
    navigate(`/chapter/${verse.chapter_number}/verse/${verse.verse_number}`);
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">
        Search Results for: "{decodeURIComponent(query)}"
      </h2>

      {results.length > 0 ? (
        <ul className="space-y-3">
          {results.map((verse, i) => (
            <li
              key={i}
              onClick={() => handleClick(verse)}
              className="p-3 border rounded cursor-pointer hover:bg-orange-50"
            >
              <p className="font-semibold text-sm text-gray-700">
                Chapter {verse.chapter_number}, Verse {verse.verse_number}
              </p>
              <p className="text-gray-800">{verse.text}</p>
              <p className="italic text-gray-600">{verse.transliteration}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;
