import { useParams, useNavigate } from "react-router-dom";
import data from "../data/verse.json";
import VersePlayer from "../components/VersePlayer";

export default function VersePage() {
  const { chapterId, verseId } = useParams();
  const navigate = useNavigate();

  const chapterNum = parseInt(chapterId);
  const verseNum = parseInt(verseId);

  // Find current verse
  const verse = data.find(
    (v) => v.chapter_number === chapterNum && v.verse_number === verseNum
  );

  // Total verses in chapter
  const totalVerses = data.filter((v) => v.chapter_number === chapterNum).length;

  if (!verse) return <p className="text-center mt-10">Verse not found</p>;

  // Navigation
  const goPrevious = () => {
    if (verseNum > 1) {
      navigate(`/chapter/${chapterNum}/verse/${verseNum - 1}`);
    } else if (chapterNum > 1) {
      const prevChapter = chapterNum - 1;
      const lastVersePrevChapter = data.filter(
        (v) => v.chapter_number === prevChapter
      ).length;
      navigate(`/chapter/${prevChapter}/verse/${lastVersePrevChapter}`);
    }
  };

  const goNext = () => {
    if (verseNum < totalVerses) {
      navigate(`/chapter/${chapterNum}/verse/${verseNum + 1}`);
    } else if (chapterNum < 18) {
      navigate(`/chapter/${chapterNum + 1}/verse/1`);
    }
  };

  // Format chapter & verse numbers for audio file names
  const chapterStr = String(chapterNum).padStart(2, "0");
  const verseStr = String(verseNum).padStart(2, "0");

  //  Split Devanagari and Transliteration by newline
  const devParts = verse.text.split("\n").filter(Boolean);
  const transParts = verse.transliteration.split("\n").filter(Boolean);

  // Make sure both arrays have same length
  const maxLines = Math.max(devParts.length, transParts.length);
  const devLines = Array.from({ length: maxLines }, (_, i) => devParts[i] || "");
  const transLines = Array.from({ length: maxLines }, (_, i) => transParts[i] || "");

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white p-4 flex flex-col items-center">
      <div className="max-w-2xl w-full bg-white shadow-xs rounded-2xl p-6 space-y-6">

        {/* Heading */}
        <h3 className="text-2xl sm:text-3xl font-bold text-center text-orange-700">
          BG {verse.chapter_number}.{verse.verse_number}
        </h3>

        {/* Chapter Names */}
        <div className="text-center">
          <h2 className="text-lg sm:text-xl bg-orange-100 inline-block px-4 py-2 rounded-lg font-bold text-gray-900">
            {verse.sanskrit_name}
          </h2>
        </div>

        {/* Sanskrit Verse */}
        <div
          className="text-orange-600 text-center text-lg sm:text-xl leading-loose font-serif space-y-1"
          style={{ fontFamily: "Noto Serif Devanagari" }}
        >
          {devLines.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>

        {/* Transliteration */}
        <div className="text-base sm:text-lg text-gray-800 text-center leading-relaxed">
          {transLines.map((line, i) => (
            <p key={i}>
              {line}{" "}
              {i === transLines.length - 1 && (
                <span className="font-normal">
                  ॥{verse.chapter_number}.{verse.verse_number}॥
                </span>
              )}
            </p>
          ))}
        </div>

        {/* Word meanings */}
        <p className="text-sm sm:text-base text-gray-800 text-center max-w-3xl leading-relaxed">
          {verse.word_meanings.split(";").map((part, i) => {
            const [roman, meaning] = part.split("—");
            return (
              <span key={i}>
                <span className="text-orange-500 font-semibold">{roman?.trim()}</span>
                {meaning ? `—${meaning.trim()}` : ""}
                {i < verse.word_meanings.split(";").length - 1 ? "; " : ""}
              </span>
            );
          })}
        </p>

        {/* English translation */}
        {verse.translation && (
          <p className="text-base sm:text-lg text-gray-900 text-center max-w-3xl leading-relaxed">
            {verse.translation}
          </p>
        )}

        {/* Audio */}
        <VersePlayer verseFile={`verse_${chapterStr}_${verseStr}_paused.wav`} />
      </div>
{/* Desktop Arrows */}
<div className="hidden md:flex justify-between mt-6">
  {/* Previous */}
  <button
    onClick={goPrevious}
    disabled={chapterNum === 1 && verseNum === 1}
    className="flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 hover:bg-orange-200 disabled:opacity-40 transition"
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
    Prev
  </button>

  {/* Next */}
  <button
    onClick={goNext}
    disabled={chapterNum === 18 && verseNum === totalVerses}
    className="flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 hover:bg-orange-200 disabled:opacity-40 transition"
  >
    Next
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

      {/* Mobile Bottom Nav */}
      <div className="fixed bottom-4 flex justify-center space-x-6 md:hidden">
        <button
          onClick={goPrevious}
          disabled={chapterNum === 1 && verseNum === 1}
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
          onClick={goNext}
          disabled={chapterNum === 18 && verseNum === totalVerses}
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
  );
}
