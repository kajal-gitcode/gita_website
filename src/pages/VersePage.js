import { useParams, useNavigate } from "react-router-dom";
import data from "../data/verse.json";

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

  // 🔹 Split Devanagari and Transliteration by newline
  const devParts = verse.text.split("\n").filter(Boolean);
  const transParts = verse.transliteration.split("\n").filter(Boolean);

  // Make sure both arrays have same length
  const maxLines = Math.max(devParts.length, transParts.length);
  const devLines = Array.from({ length: maxLines }, (_, i) => devParts[i] || "");
  const transLines = Array.from({ length: maxLines }, (_, i) => transParts[i] || "");

  return (
    <div className="flex flex-col items-center p-5 space-y-6 relative">

      {/* Desktop View - Side Arrows */}
      <div className="hidden md:block ">
        <button
          onClick={goPrevious}
          disabled={chapterNum === 1 && verseNum === 1}
          className="fixed top-1/2 left-40 flex h-10 items-center justify-center rounded-full p-2 border bg-white hover:cursor-pointer hover:brightness-90 dark:border-grey-600 dark:bg-dark-100 dark:hover:bg-dark-bg"
        >
          ◀
        </button>

        <button
          onClick={goNext}
          disabled={chapterNum === 18 && verseNum === totalVerses}
          className="fixed top-1/2 right-40 flex h-10 items-center justify-center rounded-full p-2 border bg-white hover:cursor-pointer hover:brightness-90 dark:border-grey-600 dark:bg-dark-100 dark:hover:bg-dark-bg"
        >
          ▶
        </button>
      </div>
      <div>
       {/* Heading */}
      <h3 className="text-3xl font-bold">
        BG {verse.chapter_number}.{verse.verse_number}
      </h3>
      </div>

      <div></div>
     {/* Chapter Names */}
      <div className="text-center mb-4">
      <h2 className="text-xl bg-orange-200 font-bold text-gray-900">
      {verse.sanskrit_name}
      </h2>
      </div>

      
      {/* Sanskrit Verse */}
      <div
        className="text-orange-500 text-center text-xl leading-relaxed font-serif max-w-xl mx-auto"
        style={{ fontFamily: "Noto Serif Devanagari" }}
      >
        {devLines.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>

      {/* Transliteration (matched with Devanagari lines) */}
      <div className="text-xl text-gray-800 text-center max-w-xl mx-auto">
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
<p className="Inter,sans-serif text-xm text-gray-800 text-center max-w-3xl leading-relaxed">
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
        <p className="text-lg text-gray-900 text-center max-w-3xl leading-relaxed">
          {verse.translation}
        </p>
      )}

      {/* Audio Player */}
      <audio key={`${chapterNum}-${verseNum}`} controls className="mt-4">
        <source
          src={`/audio/verse_${chapterStr}_${verseStr}_paused_repeated.wav`}
          type="audio/wav"
        />
        Your browser does not support the audio element.
      </audio>

      {/* Mobile View - Bottom Center Arrows */}
      <div className="bottom-6 left-1/3 -translate-x-1/6 bg-white space-x-8 md:hidden">
        <button
          onClick={goPrevious}
          disabled={chapterNum === 1 && verseNum === 1}
          className="rounded-full p-2 border bg-white hover:cursor-pointer hover:brightness-90 dark:border-grey-600 dark:bg-dark-100 dark:hover:bg-dark-bg"
        >
          ◀
        </button>

        <button
          onClick={goNext}
          disabled={chapterNum === 18 && verseNum === totalVerses}
          className="rounded-full p-2 border bg-white hover:cursor-pointer hover:brightness-90 dark:border-grey-600 dark:bg-dark-100 dark:hover:bg-dark-bg"
        >
          ▶
        </button>
      </div>
    </div>
  );
}
