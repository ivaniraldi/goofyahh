import { useState, useEffect, useRef } from 'react';

const notesInitialState = [];

const GuitarHero = () => {
  const [notes, setNotes] = useState(notesInitialState);
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState(0);
  const [lastNoteId, setLastNoteId] = useState(0);
  const [speed, setSpeed] = useState(1000); // Inicialmente 1 segundo
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [activeLanes, setActiveLanes] = useState([false, false, false, false]);
  const gameAreaRef = useRef(null);
  const [gameSpeed, setGameSpeed] = useState(1)

  const changeColor = (note) => {
    if (note === 0) return "#D7A508";
    if (note === 1) return "#D7A508";
    if (note === 2) return "#D7A508";
    if (note === 3) return "#D7A508";
  };

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
    }, speed);

    return () => clearInterval(interval);
  }, [lastNoteId, speed]);

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
        setActiveLane(lane);
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
          position: note.position + gameSpeed
        }));

        const missedNotes = updatedNotes.filter(note => note.position > 100);
        if (missedNotes.length > 0) {
          setMissed(prevMissed => prevMissed + missedNotes.length);
        }

        return updatedNotes.filter(note => note.position <= 100);
      });
    }, 50);

    return () => clearInterval(interval);
  }, [missed]);

  useEffect(() => {
    if (score === 10 || score === 30 || score === 50 || score === 100) {
      setSpeed(prevSpeed => prevSpeed * 0.9); // Aumenta la velocidad en un 10%
      setGameSpeed(prev=> prev + 0.3 )
    }
  }, [score]);

  useEffect(() => {
    if (missed >= 10) {
      setGameOver(true);
      setHighScore(prevHighScore => Math.max(prevHighScore, score));
    }
  }, [missed]);

  const hitNoteInLane = (lane) => {
    const noteToHit = notes.find(note => note.lane === lane && note.position > 83);
    if (noteToHit) {
      setNotes(notes.filter(note => note.id !== noteToHit.id));
      setScore(score + 1);
    }
  };

  const setActiveLane = (lane) => {
    const newActiveLanes = [...activeLanes];
    newActiveLanes[lane] = true;
    setActiveLanes(newActiveLanes);

    setTimeout(() => {
      const resetActiveLanes = [...activeLanes];
      resetActiveLanes[lane] = false;
      setActiveLanes(resetActiveLanes);
    }, 200); // 200ms de color verde
  };

  const handleLaneClick = (lane) => {
    hitNoteInLane(lane);
    setActiveLane(lane);
  };

  const restartGame = () => {
    setNotes(notesInitialState);
    setScore(0);
    setMissed(0);
    setLastNoteId(0);
    setSpeed(1000);
    setGameOver(false);
    setActiveLanes([false, false, false, false]);
  };

  return (
    <div className="game-area" ref={gameAreaRef}>
      {gameOver ? (
        <div className="game-over">
          <div>Game Over!</div>
          <div>High Score: {highScore}</div>
          <button className='buttongh' onClick={restartGame}>Restart</button>
        </div>
      ) : (
        <>
          <div className="score">Score: {score}</div>
          <div className="missed">Failed: {missed}</div>
          {notes.map(note => (
            <div
              key={note.id}
              className="note"
              style={{ top: `${note.position}%`, left: `${note.lane * 25}%`, backgroundColor: `${changeColor(note.lane)}` }}
            ></div>
          ))}
          <div className="lanes">
            <div className="lane" onClick={() => handleLaneClick(0)} style={{ backgroundColor: activeLanes[0] ? 'd7a7088b' : '#ffffff1a' }}>←</div>
            <div className="lane" onClick={() => handleLaneClick(1)} style={{ backgroundColor: activeLanes[1] ? 'd7a7088b' : '#ffffff1a' }}>↓</div>
            <div className="lane" onClick={() => handleLaneClick(2)} style={{ backgroundColor: activeLanes[2] ? 'd7a7088b' : '#ffffff1a' }}>↑</div>
            <div className="lane" onClick={() => handleLaneClick(3)} style={{ backgroundColor: activeLanes[3] ? 'd7a7088b' : '#ffffff1a' }}>→</div>
          </div>
        </>
      )}
    </div>
  );
};

export default GuitarHero;
