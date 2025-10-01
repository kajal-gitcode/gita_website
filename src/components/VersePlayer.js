import React, { useEffect, useRef, useState } from "react";
import { PAUSE_TIMINGS } from "../data/pauses.js";

const EPS = 0.25; // small buffer for segment end

export default function VersePlayer({ verseFile }) {
  const audioRef = useRef(null);
  const [repeatCount, setRepeatCount] = useState(1);
  const [segs, setSegs] = useState([]);
  const [segIndex, setSegIndex] = useState(0);
  const [repeatLeft, setRepeatLeft] = useState(0);

  // Build segments when verseFile changes
  useEffect(() => {
    const pauses = PAUSE_TIMINGS[verseFile] || [];
    const segments = pauses.map(p => ({ start: p.start, end: p.end }));
    setSegs(segments);
    setSegIndex(0);
    setRepeatLeft(repeatCount - 1);

    if (audioRef.current) {
      audioRef.current.currentTime = segments[0]?.start || 0;
      // autoplay removed → user clicks to start
    }
  }, [verseFile, repeatCount]);

  // Handle word repetition on time update
  const handleTimeUpdate = () => {
    if (!segs.length) return;
    const audio = audioRef.current;
    const seg = segs[segIndex];
    if (!seg) return;

    if (audio.currentTime >= seg.end - EPS) {
      if (repeatLeft > 0) {
        audio.currentTime = seg.start;
        setRepeatLeft(prev => prev - 1);
      } else {
        const nextIndex = segIndex + 1;
        setSegIndex(nextIndex);
        setRepeatLeft(repeatCount - 1);

        if (nextIndex >= segs.length) {
          audio.pause();
        }
      }
    }
  };

  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <audio
        ref={audioRef}
        src={`/audio/${verseFile}`}
        controls
        onTimeUpdate={handleTimeUpdate}
      ></audio>

      <div style={{ marginTop: "0.5rem" }}>
        <label>Repeat per word: </label>
        <select
          value={repeatCount}
          onChange={(e) => setRepeatCount(parseInt(e.target.value, 10))}
        >
          <option value={1}>1x</option>
          <option value={2}>2x</option>
          <option value={3}>3x</option>
          <option value={4}>4x</option>
          <option value={5}>5x</option>
        </select>
      </div>
    </div>
  );
}
