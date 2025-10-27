import React, { useEffect, useRef, useState } from "react";
import { PAUSE_TIMINGS } from "../data/pauses.js";

const EPS = 0.25; // small buffer for segment end

export default function VersePlayer({ verseFile, onVerseEnd, autoPlay,playMode }) {
  const audioRef = useRef(null);
  const [repeatCount, setRepeatCount] = useState(1);
  const [segments, setSegments] = useState([]);
  const [segIndex, setSegIndex] = useState(0);
  const [repeatLeft, setRepeatLeft] = useState(0);
  const [isEnded, setIsEnded] = useState(false);

 
  useEffect(() => {
    const pauses = PAUSE_TIMINGS[verseFile] || [];
    const segs = pauses.map((p) => ({ start: p.start, end: p.end }));
    setSegments(segs);
    setSegIndex(0);
    setRepeatLeft(repeatCount - 1);
    setIsEnded(false);

    if (audioRef.current) {
      audioRef.current.currentTime = segs[0]?.start || 0;
    }
  }, [verseFile, repeatCount]);

  
  useEffect(() => {
  const audio = audioRef.current;
  if (!audio) return;

  if (autoPlay) {
    //  Automatically start playback
    audio.currentTime = 0;
    audio.play();
  } else {
    //  Pause until user manually plays
    audio.pause();
  }

  const handleEnded = () => {
    // Only call onVerseEnd if Play All mode
    if (onVerseEnd && playMode === "all") {
      onVerseEnd();
    }
  };

  audio.addEventListener("ended", handleEnded);
  return () => {
    audio.removeEventListener("ended", handleEnded);
  };
}, [verseFile, autoPlay, playMode]);


  //  Handle playback time — loop words or move to next
  const handleTimeUpdate = () => {
    if (!segments.length) return;
    const audio = audioRef.current;
    const seg = segments[segIndex];
    if (!seg) return;

    if (audio.currentTime >= seg.end - EPS) {
      if (repeatLeft > 0) {
        audio.currentTime = seg.start;
        setRepeatLeft((prev) => prev - 1);
      } else {
        const nextIndex = segIndex + 1;
        if (nextIndex < segments.length) {
          setSegIndex(nextIndex);
          setRepeatLeft(repeatCount - 1);
        } else {
          setIsEnded(true);
          if (onVerseEnd) onVerseEnd();
          audio.pause();
        }
      }
    }
  };

  const handleEnded = () => {
    if (isEnded) return;
    setIsEnded(true);
    if (onVerseEnd && autoPlay) {
       onVerseEnd();
    }
  };

  return (
    <div className="my-4">
      <audio
        ref={audioRef}
        src={`/audio/${verseFile}`}
        controls
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        className="w-full rounded-lg"
      ></audio>

      <div className="mt-2 flex items-center gap-2 text-sm text-gray-700">
        <label className="font-medium">Repeat per phrase:</label>
        <select
          value={repeatCount}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => setRepeatCount(parseInt(e.target.value, 10))}
          className="border border-orange-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-orange-300 bg-white"
        >
          {[1, 2, 3, 4, 5].map((count) => (
            <option key={count} value={count}>
              {count}x
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
