// src/pages/ChapterPage.js
import { Link, useParams } from "react-router-dom";
import data from "../data/verse.json";
import chapters from "../data/chapter.json";
import VersePlayer from "../components/VersePlayer";

function VerseCard({ verse, chapterId, getAudioPath }) {
  return (
    <div
      key={verse.id}
      className="bg-orange-50 border border-orange-100 shadow-md rounded-2xl p-4 sm:p-5 hover:shadow-lg hover:border-orange-300 transition cursor-pointer"
      onClick={() =>
        (window.location.href = `/chapter/${chapterId}/verse/${verse.verse_number}`)
      }
    >
      {/* Verse heading */}
      <h3 className="text-base sm:text-lg text-orange-500 font-bold mb-2">
        Verse {verse.verse_number}
      </h3>

       {/* Chapter Names */}
      
      <h2 className="text-base sm:text-lg mb-2  text-gray-900">
      {verse.sanskrit_name}
      </h2>
      

      {/* Sanskrit text */}
      <p className="text-gray-900 font-serif text-l sm:text-base mb-2">
        {verse.text}
      </p>

      {/* Transliteration */}
      <p className="text-gray-800 italic text-l sm:text-sm mb-2">
        {verse.transliteration}
      </p>

      {/* Meaning */}
      <p className="text-gray-700 text-l sm:text-sm mb-4 line-clamp-3">
        {verse.meaning}
      </p>
     {/* ✅ VersePlayer */}
      <VersePlayer verseFile={getAudioPath(chapterId, verse.verse_number)} />

    
      <Link
        to={`/chapter/${chapterId}/verse/${verse.verse_number}`}
        onClick={(e) => e.stopPropagation()}
        className="text-blue-600 hover:text-blue-800 underline text-xs sm:text-sm"
      >
        Read More →
      </Link>
    </div>
  );
}

export default function ChapterPage() {
  const { chapterId } = useParams();
  const verses = data.filter((v) => v.chapter_number === parseInt(chapterId));
  const chapter = chapters.find((c) => c.id === parseInt(chapterId));

  const getAudioPath = (chapter, verse) => {
    const ch = String(chapter).padStart(2, "0");
    const vs = String(verse).padStart(2, "0");
    return `/verse_${ch}_${vs}_paused.wav`;
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Chapter Heading */}
      <div className="mb-8 text-center">
        <h3 className="text-lg sm:text-xl text-blue-600">CHAPTER {chapterId}</h3>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-1">
          {chapter?.name}
        </h1>
        <p className="text-gray-700 mt-3 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          {chapter?.summary}
        </p>
      </div>

      {/* Verse Grid */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
        {verses.map((v) => (
          <VerseCard
            key={v.id}
            verse={v}
            chapterId={chapterId}
            getAudioPath={getAudioPath}
          />
        ))}
      </div>
    </div>
  );
}
