
import { useParams, useNavigate } from "react-router-dom";
import data from "../data/verse.json";
import chapters from "../data/chapter.json";
import VersePlayer from "../components/VersePlayer";
import { useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";



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
      <h3 className="text-base sm:text-lg text-orange-500 font-bold  mb-2">
        Verse {verse.verse_number}
      </h3>

      <h2 className="text-base sm:text-lg mb-1 text-gray-900">
        {verse.sanskrit_name}
      </h2>

      <p className="text-gray-900 font-serif text-l sm:text-base mb-1">
        {verse.text}
      </p>

      <p className="text-gray-800 italic text-l sm:text-sm mb-1">
        {verse.transliteration}
      </p>

      <p className="text-gray-700 text-l sm:text-sm mb-1 line-clamp-3">
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

  const [, ...restQueue] = queue;   
  setQueue(restQueue);               // update queue
  setCurrentVerseIndex(verses.indexOf(restQueue[0])); // update index
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
  
    {/* --- Desktop Nav Buttons  --- */}
    <div className="hidden sm:flex items-center gap-3">
      <button
        disabled={parseInt(chapterId) === 1}
        onClick={() => navigate(`/chapter/${parseInt(chapterId) - 1}`)}
        className="rounded-full p-3 bg-orange-100 text-orange-700 hover:bg-orange-200 disabled:opacity-40 transition">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
          <path d="M15 6L9 12L15 18" />
        </svg>
      </button>

      <button
        disabled={parseInt(chapterId) === chapters.length}
        onClick={() => navigate(`/chapter/${parseInt(chapterId) + 1}`)}
        className="rounded-full p-3 bg-orange-100 text-orange-700 hover:bg-orange-200 disabled:opacity-40 transition">
         <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
          <path d="M9 6L15 12L9 18" />
        </svg>
      </button>
    </div>
  </div>

{/* --- Mobile View Nav + Toggle --- */}
 <div className="flex sm:hidden items-center justify-between w-full px-2 mt-1">
  <div className="flex items-center gap-3">
    <button
      disabled={parseInt(chapterId) === 1}
      onClick={() => navigate(`/chapter/${parseInt(chapterId) - 1}`)}
      className="rounded-full p-3 bg-orange-100 text-orange-700 hover:bg-orange-200 disabled:opacity-40 transition">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round">
        <path d="M15 6L9 12L15 18" />
      </svg>
     </button>
    <button
      disabled={parseInt(chapterId) === chapters.length}
      onClick={() => navigate(`/chapter/${parseInt(chapterId) + 1}`)}
      className="rounded-full p-3 bg-orange-100 text-orange-700 hover:bg-orange-200 disabled:opacity-40 transition">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round">
        <path d="M9 6L15 12L9 18" />
      </svg>
     </button>
    </div>
    {/*toggle */}
  <div className="relative flex bg-orange-100 rounded-full w-28 h-10 items-center justify-between px-2 transition-all duration-300">
   <div
      className={`absolute top-1 left-1 h-[calc(100%-8px)] bottom-1 w-[50%] bg-orange-400 rounded-full transition-transform duration-300 ${
        playMode === "one" ? "translate-x-0" : "translate-x-full"
      }`}>
   </div>
    <button
      onClick={() => setPlayMode("one")}
      className="relative z-10 w-1/2 flex flex-col justify-center items-center">
      <PlayArrowIcon
        fontSize="small"
        className={`transition-colors duration-300 ${
          playMode === "one" ? "text-white" : "text-orange-600"
        }`}/>
      <span
        className={`text-[9px] font-medium transition-colors duration-300 ${
          playMode === "one" ? "text-white" : "text-orange-600"
        }`} >
        Manual
      </span>
    </button>
    <button
      onClick={() => {
        setQueue(verses);
        setCurrentVerseIndex(0);
        setPlayMode("all");}}
      className="relative z-10 w-1/2 flex flex-col justify-center items-center">
      <AllInclusiveIcon
        fontSize="small"
        className={`transition-colors duration-300 ${
          playMode === "all" ? "text-white" : "text-orange-600"
        }`}/>
      <span
        className={`text-[9px] font-medium transition-colors duration-300 ${
          playMode === "all" ? "text-white" : "text-orange-600"
        }`}>
        Auto
      </span>
    </button>
  </div>
</div>
</div>

{/* ====== SUMMARY ====== */}
 <p className="text-gray-700 text-sm sm:text-base mb-2 text-center max-w-3xl mx-auto leading-relaxed">
    {chapter?.summary}
  </p>
{/*toggle switch for desktop */}
{/* <div className=" justify-between  px-2 py-2 items-center mt-2">
<div className="hidden sm:flex relative  flex bg-orange-100 rounded-full w-36 h-14 items-center justify-between px-2 transition-all duration-300"> */}
<div className="hidden sm:flex justify-end mb-2 px-4">
  <div className="relative flex bg-orange-100 rounded-full w-36 h-14 items-center justify-between px-2 transition-all duration-300 shadow-md">
   <div
    className={`absolute top-1 left-1 h-[calc(100%-8px)] bottom-1 w-[50%] bg-orange-400 rounded-full transition-transform duration-300 ${
      playMode === "one" ? "translate-x-0" : "translate-x-full"}`}>
  </div>
  <button
    onClick={() => setPlayMode("one")}
    className="relative z-10 w-1/2 flex justify-center items-center">
    <PlayArrowIcon
      fontSize="medium"
      className={`transition-colors duration-300 ${
        playMode === "one" ? "text-white" : "text-orange-600"
      }`}/>
      <span
      className={`text-[11px] font-medium transition-colors duration-300 ${
        playMode === "one" ? "text-white" : "text-orange-600"
      }`}>
      Manual
    </span>
  </button>
  <button
    onClick={() => {
      setQueue(verses);
      setCurrentVerseIndex(0);
      setPlayMode("all");}}
    className="relative z-10 w-1/2 flex justify-center items-center">
    <AllInclusiveIcon
      fontSize="medium"
      className={`transition-colors duration-300 ${
        playMode === "all" ? "text-white" : "text-orange-600"
      }`}/>
     <span
      className={`text-[11px] font-medium transition-colors duration-300 ${
        playMode === "all" ? "text-white" : "text-orange-600"
      }`}>
      Auto
    </span>
  </button>
 </div> 
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
  {/*--- Manual Mode ---*/}
    {playMode === "one" ? (
   <div className="grid gap-2 sm:gap-2 grid-cols-1 sm:grid-cols-1 lg:grid-cols-1">
    {verses.map((v) => (
      <VerseCard
        key={v.id} 
        verse={v}
        chapterId={chapterId}
        getAudioPath={getAudioPath}
        playMode={playMode}
        autoPlay={false}/>
    ))}
  </div>
) : (
  //--- Auto mode ---
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