// src/GuitarHero.js
import { useState, useEffect, useRef } from 'react';

const notesInitialState = [];

const GuitarHero = () => {
  const [notes, setNotes] = useState(notesInitialState);
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState(0);
  const [lastNoteId, setLastNoteId] = useState(0);
  const gameAreaRef = useRef(null);

  const addNote = () => {
    const newNote = {
      id: lastNoteId,
      position: 0,
      lane: Math.floor(Math.random() * 4) // 4 lanes (0: left, 1: down, 2: up, 3: right)
    };
    setLastNoteId(lastNoteId + 1);
    setNotes(prevNotes => [...prevNotes, newNote]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      addNote();
    }, 1000);

    return () => clearInterval(interval);
  }, [lastNoteId]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const arrowKeys = {
        ArrowLeft: 0,
        ArrowDown: 1,
        ArrowUp: 2,
        ArrowRight: 3
      };

      const lane = arrowKeys[event.key];
      if (lane !== undefined) {
        hitNoteInLane(lane);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [notes]);

  useEffect(() => {
    const interval = setInterval(() => {
      setNotes(prevNotes => {
        const updatedNotes = prevNotes.map(note => ({
          ...note,
          position: note.position + 1
        }));

        const missedNotes = updatedNotes.filter(note => note.position > 100);
        if (missedNotes.length > 0) {
          setMissed(missed + missedNotes.length);
        }

        return updatedNotes.filter(note => note.position <= 100);
      });
    }, 50);

    return () => clearInterval(interval);
  }, [missed]);

  const hitNoteInLane = (lane) => {
    const noteToHit = notes.find(note => note.lane === lane && note.position > 90);
    if (noteToHit) {
      setNotes(notes.filter(note => note.id !== noteToHit.id));
      setScore(score + 1);
    }
  };

  const handleLaneClick = (lane) => {
    hitNoteInLane(lane);
  };

  return (
    <div className="game-area" ref={gameAreaRef}>
      <div className="score">Score: {score}</div>
      <div className="missed">Failed: {missed}</div>
      {notes.map(note => (
        <div
          key={note.id}
          className="note"
          style={{ top: `${note.position}%`, left: `${note.lane * 25}%` }}
        ></div>
      ))}
      <div className="lanes">
        <div className="lane" onClick={() => handleLaneClick(0)}>←</div>
        <div className="lane" onClick={() => handleLaneClick(1)}>↓</div>
        <div className="lane" onClick={() => handleLaneClick(2)}>↑</div>
        <div className="lane" onClick={() => handleLaneClick(3)}>→</div>
      </div>
    </div>
  );
};

export default GuitarHero;
