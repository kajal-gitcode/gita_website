
import { useParams, useNavigate } from "react-router-dom";
import data from "../data/verse.json";
import chapters from "../data/chapter.json";
import VersePlayer from "../components/VersePlayer";
import { useState } from "react";

// --- Reusable Verse Card Component ---
function VerseCard({ verse, chapterId, getAudioPath, playMode, onNext, autoPlay }) {
  const handleCardClick = () => {
    if (playMode === "one") {
      window.location.href = `/chapter/${chapterId}/verse/${verse.verse_number}`;
    }
  };

  return (
    <div
      key={verse.id}
      className={`bg-orange-50 border border-orange-100 shadow-md rounded-2xl p-4 sm:p-5 hover:shadow-lg hover:border-orange-300 transition cursor-pointer
        ${playMode === "all" ? "opacity-95" : ""}
      `}
      onClick={handleCardClick}
    >
      <h3 className="text-base sm:text-lg text-orange-500 font-bold mb-2">
        Verse {verse.verse_number}
      </h3>

      <h2 className="text-base sm:text-lg mb-2 text-gray-900">
        {verse.sanskrit_name}
      </h2>

      <p className="text-gray-900 font-serif text-l sm:text-base mb-2">
        {verse.text}
      </p>

      <p className="text-gray-800 italic text-l sm:text-sm mb-2">
        {verse.transliteration}
      </p>

      <p className="text-gray-700 text-l sm:text-sm mb-4 line-clamp-3">
        {verse.meaning}
      </p>

      <div onClick={(e) => e.stopPropagation()}>
        <VersePlayer
          verseFile={getAudioPath(chapterId, verse.verse_number)}
          onVerseEnd={onNext}
          autoPlay={autoPlay}
        />
      </div>
    </div>
  );
}

// --- Main Page Component ---
export default function ChapterPage() {
  const { chapterId } = useParams();
  const navigate = useNavigate();

  const verses = data.filter((v) => v.chapter_number === parseInt(chapterId));
  const chapter = chapters.find((c) => c.id === parseInt(chapterId));
  const [queue, setQueue] = useState([]);  // Queue for Play All
  const [searchVerse, setSearchVerse] = useState("");
  const [playMode, setPlayMode] = useState("one");
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);

  //  Get correct audio path
  const getAudioPath = (chapter, verse) => {
    const ch = String(chapter).padStart(2, "0");
    const vs = String(verse).padStart(2, "0");
    return `verse_${ch}_${vs}_paused.wav`;
  };

  const handleNextVerse = () => {
  if(queue.length <= 1){
    console.log(" All verses finished");
    setQueue([]);
    setPlayMode("all"); 
    return;
  }

  const [, ...restQueue] = queue;    // remove first verse
  setQueue(restQueue);               // update queue
  setCurrentVerseIndex(verses.indexOf(restQueue[0])); // update index
};


  //  Go to verse by input
  const goToVerse = (v) => {
    navigate(`/chapter/${chapterId}/verse/${v}`);
    setSearchVerse("");
  };

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">



{/* ====== HEADER of chapter page ====== */}
<div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
  {/* --- Left: Chapter Number --- */}
  <div className="flex items-center justify-center">
    <div className="bg-orange-400 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">
      {chapterId}
    </div>
    <span className="hidden sm:block text-sm font-medium text-gray-600 mt-1 opacity-80 ml-2">
      Chapter
    </span>
  </div>

  {/* --- Center: Chapter Name --- */}
  <div className="flex flex-col items-center sm:flex-row sm:items-center sm:gap-4">
    <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 border-b-2 border-orange-300 pb-1 leading-none text-center sm:text-left">
      {chapter?.name}
    </h1>

    {/* --- Desktop Buttons (beside name) --- */}
    <div className="hidden sm:flex items-center gap-3">
      {/* Previous Chapter */}
      <button
        disabled={parseInt(chapterId) === 1}
        onClick={() => navigate(`/chapter/${parseInt(chapterId) - 1}`)}
        className="rounded-full p-3 bg-orange-100 text-orange-700 hover:bg-orange-200 disabled:opacity-40 transition"
      >
        {/* Left Arrow SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 6L9 12L15 18" />
        </svg>
      </button>

      {/* Next Chapter */}
      <button
        disabled={parseInt(chapterId) === chapters.length}
        onClick={() => navigate(`/chapter/${parseInt(chapterId) + 1}`)}
        className="rounded-full p-3 bg-orange-100 text-orange-700 hover:bg-orange-200 disabled:opacity-40 transition"
      >
        {/* Right Arrow SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 6L15 12L9 18" />
        </svg>
      </button>
    </div>
  </div>

  {/* ---  Buttons (below name) --- */}
  <div className="flex sm:hidden items-center justify-center gap-4 mt-1">
    <button
      disabled={parseInt(chapterId) === 1}
      onClick={() => navigate(`/chapter/${parseInt(chapterId) - 1}`)}
      className="rounded-full p-3 bg-orange-100 text-orange-700 hover:bg-orange-200 disabled:opacity-40 transition"
    >
      {/* Left Arrow SVG */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15 6L9 12L15 18" />
      </svg>
    </button>

    <button
      disabled={parseInt(chapterId) === chapters.length}
      onClick={() => navigate(`/chapter/${parseInt(chapterId) + 1}`)}
      className="rounded-full p-3 bg-orange-100 text-orange-700 hover:bg-orange-200 disabled:opacity-40 transition"
    >
      {/* Right Arrow SVG */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 6L15 12L9 18" />
      </svg>
    </button>
    </div>
  </div>

      {/* ====== SUMMARY ====== */}
      <p className="text-gray-700 text-sm sm:text-base mb-8 text-center max-w-3xl mx-auto leading-relaxed">
        {chapter?.summary}
      </p>

      {/* ====== GO TO VERSE BAR ====== */}
      <div className="mb-6 flex justify-center gap-3">
        <div className="flex items-center border border-orange-100 rounded-xl bg-white shadow-sm overflow-hidden">
          <input
            type="number"
            placeholder="Go to verse"
            value={searchVerse}
            onChange={(e) => setSearchVerse(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && searchVerse) {
                const verseNum = parseInt(searchVerse);
                if (verseNum >= 1 && verseNum <= verses.length) goToVerse(verseNum);
              }
            }}
            className="w-40 py-2.5 px-3 text-base outline-none border-none focus:ring-0 placeholder:text-gray-400 text-gray-800"
            min={1}
            max={verses.length}
          />
          <button
            onClick={() => {
              if (searchVerse) {
                const verseNum = parseInt(searchVerse);
                if (verseNum >= 1 && verseNum <= verses.length) goToVerse(verseNum);
              }
            }}
            className="bg-orange-400 text-white px-5 py-3 text-sm font-semibold hover:bg-orange-500 transition-all"
          >
            Go
          </button>
        </div>

        <div className="flex items-center gap-1 bg-orange-50 border border-orange-200 rounded-xl px-4 py-3 shadow-inner">
          <span className="text-gray-700 font-semibold text-sm sm:text-base">
            {verses.length}
          </span>
          <span className="text-gray-700 text-m sm:text-sm font-medium">
            Verses
          </span>
        </div>
      </div>

    
      {/* ====== TOGGLE MODE SECTION ======*/}
     <div className="flex items-center justify-center gap-3 mb-4">
      <span className="text-gray-700 font-medium">Mode of Play:</span>

     {/* === Play One Button === */}
    <button
      onClick={() => setPlayMode("one")}
      className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-200 border-2 ${
     playMode === "one"
        ? "border-orange-300 bg-orange-400 text-white hover:border-orange-300 hover:text-white shadow-md shadow-orange-200 scale-105"
        : "border-orange-300 text-orange-400 scale-105 "
      }`}

     >
      Play One
    </button>

    {/* === Play All Button === */}
    <button
      onClick={() => {
      setQueue(verses);        // Initialize queue with all verses
      setCurrentVerseIndex(0); // Start from first verse
      setPlayMode("all");
    }}
    className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-200 border-2 ${
     playMode === "all"
    ? "border-orange-300 bg-orange-400 text-white hover:border-orange-300 hover:text-white shadow-md shadow-orange-200 scale-105"
    : "border-orange-300 text-orange-400 scale-105 "
     }`}

  >
     Play All
    </button>
    </div>

      {/* ====== NOW PLAYING ====== */}
      {playMode === "all" && (
          <div className="mb-6 text-center bg-orange-50 border border-orange-200 rounded-xl p-3 shadow-inner max-w-xl mx-auto px-4 sm:px-6 flex flex-col items-center">
          <span className="text-gray-800 font-medium ">
            ▶️ Now Playing:
            <span className="font-semibold text-orange-600 ml-1">
              Verse {verses[currentVerseIndex]?.verse_number}
            </span>
          </span>
        </div>
      )}

      {/* ====== VERSES DISPLAY ====== */}
     
  {/* --- Manual Mode ---*/}

   {playMode === "one" ? (
  <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
    {verses.map((v) => (
      <VerseCard
        key={v.id}
        verse={v}
        chapterId={chapterId}
        getAudioPath={getAudioPath}
        playMode={playMode}
        autoPlay={false}
      />
    ))}
  </div>
) : (
  //--- Play All Mode: Centered Single Verse ---
  <div className="flex justify-center mb-6">
    <VerseCard
      key={currentVerseIndex}
      verse={verses[currentVerseIndex]}
      chapterId={chapterId}
      getAudioPath={getAudioPath}
      playMode={playMode}
      onNext={handleNextVerse}
      autoPlay={true}
    />
  </div>
)}

{/* ====== GO TO TOP BUTTON (MOBILE ONLY) ====== */}
{playMode === "one" && (
<button
  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
  className=" fixed bottom-5 right-5 bg-gray-400 text-white p-3 rounded-full shadow-lg hover:bg-gray-600 transition-all"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
  </svg>
</button>
)}
</div>
  )}