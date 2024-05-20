import { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import NavBar from './NavBar';

const getRandomPosition = () => {
  const min = 1;
  const max = 98;
  const x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  const y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y];
};

export default function Snake() {
  const [snakeDots, setSnakeDots] = useState([[0, 0], [2, 0]]);
  const [food, setFood] = useState(getRandomPosition());
  const [direction, setDirection] = useState('RIGHT');
  const [speed, setSpeed] = useState(150);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    document.onkeydown = onKeyDown;
    if (gameOver) return;
    const moveSnake = setInterval(() => {
      move();
    }, speed);
    return () => clearInterval(moveSnake);
  }, [direction, snakeDots, gameOver]);

  const onKeyDown = (e) => {
    e = e || window.event;
    switch (e.keyCode) {
      case 38:
        setDirection('UP');
        break;
      case 40:
        setDirection('DOWN');
        break;
      case 37:
        setDirection('LEFT');
        break;
      case 39:
        setDirection('RIGHT');
        break;
      default:
        break;
    }
  };

  const move = () => {
    if (gameOver) return;
    let dots = [...snakeDots];
    let head = dots[dots.length - 1];

    switch (direction) {
      case 'RIGHT':
        head = [head[0] + 2, head[1]];
        break;
      case 'LEFT':
        head = [head[0] - 2, head[1]];
        break;
      case 'DOWN':
        head = [head[0], head[1] + 2];
        break;
      case 'UP':
        head = [head[0], head[1] - 2];
        break;
      default:
        break;
    }
    dots.push(head);
    dots.shift();
    setSnakeDots(dots);
    checkIfEat(head);
    checkIfOutOfBorders(head);
    checkIfCollapsed(dots);
  };

  const checkIfOutOfBorders = (head) => {
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      onGameOver();
    }
  };

  const checkIfCollapsed = (snake) => {
    let snakeWithoutHead = snake.slice(0, snake.length - 1);
    let head = snake[snake.length - 1];
    snakeWithoutHead.forEach(dot => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        onGameOver();
      }
    });
  };

  const checkIfEat = (head) => {
    if (head[0] === food[0] && head[1] === food[1]) {
      setFood(getRandomPosition());
      enlargeSnake();
      increaseSpeed();
    }
  };

  const enlargeSnake = () => {
    let newSnake = [...snakeDots];
    newSnake.unshift([]);
    setSnakeDots(newSnake);
  };

  const increaseSpeed = () => {
    if (speed > 60) {
      setSpeed(speed - 10);
    }
  };

  const onGameOver = () => {
    setGameOver(true);
  };

  const resetGame = () => {
    setSnakeDots([[0, 0], [2, 0]]);
    setFood(getRandomPosition());
    setDirection('RIGHT');
    setSpeed(150);
    setGameOver(false);
  };

  const swipeHandlers = useSwipeable({
    onSwipedUp: () => setDirection('UP'),
    onSwipedDown: () => setDirection('DOWN'),
    onSwipedLeft: () => setDirection('LEFT'),
    onSwipedRight: () => setDirection('RIGHT'),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  return (
    <div>
      <NavBar></NavBar>
      <div className='snake-container' {...swipeHandlers}>
        <h1 className='text-4xl text-violet-500 my-5 mb-10'>Snake Game</h1>
        <div className={"game-area2"}>
          {snakeDots.map((dot, i) => (
            <div className="snake-dot" key={i} style={{ left: `${dot[0]}%`, top: `${dot[1]}%` }}></div>
          ))}
          <div className="food-dot" style={{ left: `${food[0]}%`, top: `${food[1]}%` }}></div>
          {gameOver && <div className="game-over">
            <h1>Game Over</h1>
            <button onClick={resetGame}>Play Again</button>
          </div>}
        </div>
      </div>
    </div>
  )
}
