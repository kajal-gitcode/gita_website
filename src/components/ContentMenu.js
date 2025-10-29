
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const VERSE_COUNT = {
  1: 47, 2: 72, 3: 43
  , 4: 42, 5: 29, 6: 47, 7: 30, 8: 28, 9: 34, 10: 42,
  11: 55, 12: 20, 13: 35, 14: 27, 15: 20, 16: 24, 17: 28, 18: 78,
};

export default function ContentMenu({ onSelect }) {
  const [selectedChapter, setSelectedChapter] = useState("1");
  const [selectedVerse, setSelectedVerse] = useState(1);
  const navigate = useNavigate();

  //  Corrected: Only navigate after drawer closes
  const handleVerseClick = (chapter, verse) => {
    setSelectedVerse(verse);

    if (onSelect) {
      onSelect(chapter, verse);
    } 
    else {  
      navigate(`/chapter/${chapter}/verse/${verse}`);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {/* Chapters */}
      <div className="bg-white p-3 rounded-xl shadow-sm border">
        <h2 className="font-bold text-gray-700 mb-2">Chapters</h2>
        <ul className="space-y-1 max-h-72 overflow-y-auto">
          {Object.keys(VERSE_COUNT).map((chapter) => (
            <li
              key={chapter}
              onClick={() => {
                setSelectedChapter(chapter);
                setSelectedVerse(1);
              }}
              className={`cursor-pointer px-2 py-1 rounded-md transition ${
                selectedChapter === chapter
                  ? "bg-orange-200 text-orange-800 font-semibold"
                  : "hover:bg-orange-50"
              }`}
            >
              Chapter {chapter}
            </li>
          ))}
        </ul>
      </div>

      {/* Verses */}
      <div className="bg-orange-50 p-3 rounded-xl shadow-sm border">
        <h2 className="font-bold text-gray-700 mb-2">Verses</h2>
        {selectedChapter ? (
          <div className="grid grid-cols-5 sm:grid-cols-8 gap-2 pr-2">
            {Array.from(
              { length: VERSE_COUNT[selectedChapter] },
              (_, i) => i + 1
            ).map((verse) => (
              <button
                key={verse}
                onClick={() => handleVerseClick(selectedChapter, verse)}
                className={`px-2 py-1 rounded-md transition ${
                  selectedVerse === verse
                    ? "bg-blue-500 text-white"
                    : "hover:bg-orange-300"
                }`}
              >
                {verse}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">Select a chapter</p>
        )}
      </div>
    </div>
  );
}
