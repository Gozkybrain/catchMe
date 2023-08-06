import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faPlay, faArrowLeft, faArrowRight, faPause } from '@fortawesome/free-solid-svg-icons';
import Obstacle from './Obstacle';
import { Modal, Button } from 'react-bootstrap';
import ObstacleCourseGame from './ObstacleCourseGame';
import Scoreboard from './ScoreBoard';
import './AppCover/Cover.css';
import Cover from './AppCover/Cover';
import ALertBox from './AlertBox';
import gamePieceImage from '../assets/myShip.png'; // Import your game piece image here
import collisionSound from '../assets/hit.wav'; // Import your collision sound here

const GameArea = () => {
  // Define the game constants and states
  const gameAreaWidth = window.innerWidth;
  const gameAreaHeight = window.innerHeight;
  const gamePieceSize = 30;
  const obstacleGap = 200;
  const minHeight = 20;
  const maxHeight = 200;
  const obstacleWidth = 50;
  const obstacleWidthWithBonus = 100; // Width of the longer obstacles
  const [gamePieceX, setGamePieceX] = useState(gameAreaWidth / 2 - gamePieceSize / 2); // Start at the center horizontally
  const [gamePieceY, setGamePieceY] = useState(gameAreaHeight / 2 - gamePieceSize / 2); // Start at the center vertically
  const [obstacles, setObstacles] = useState([]);
  const [score, setScore] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false); // New state to track if the game has started
  const [gameSpeed, setGameSpeed] = useState(5); // Adjust game speed based on score

  // Audio element for collision sound using useRef
  const collisionSoundRef = useRef(new Audio(collisionSound));

  // Function to create a new obstacle
  const createObstacle = useCallback(() => {
    // Generate a random height for the obstacle between minHeight and maxHeight
    const height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);

    // There is a 10% chance of creating a longer obstacle
    const isLongObstacle = Math.random() < 0.1;

    // Choose the obstacle width based on whether it's a long obstacle or not
    const obstacleWidthToUse = isLongObstacle ? obstacleWidthWithBonus : obstacleWidth;

    // Adjust the top obstacle height to match the longer bottom obstacle if it's a long obstacle
    const topObstacleHeight = isLongObstacle ? height + 50 : height;

    // Create the top obstacle object
    const topObstacle = {
      x: gameAreaWidth,
      y: 0,
      width: obstacleWidthToUse,
      height: topObstacleHeight,
      color: 'white',
      border: '1px solid orange',
      borderRadius: isLongObstacle ? '0 0 20px 20px' : '0 0 10px 10px',
    };

    // Create the bottom obstacle object
    const bottomObstacle = {
      x: gameAreaWidth,
      y: topObstacleHeight + obstacleGap,
      width: obstacleWidthToUse,
      height: gameAreaHeight - topObstacleHeight - obstacleGap,
      color: 'orange',
      border: '1px solid #fff',
      borderRadius: isLongObstacle ? '20px 20px 0 0' : '10px 10px 0 0',
    };

    // Add the obstacles to the list of obstacles
    setObstacles((prevObstacles) => [...prevObstacles, topObstacle, bottomObstacle]);
  }, [gameAreaWidth, gameAreaHeight, obstacleGap, maxHeight, minHeight]);

  // Function to move obstacles
  const moveObstacles = useCallback(() => {
    // Move each obstacle 1 pixel to the left
    setObstacles((prevObstacles) => prevObstacles.map((obstacle) => ({ ...obstacle, x: obstacle.x - 1 })));
  }, []);

  // Function to check collision
  const checkCollision = useCallback(() => {
    // Check if the game piece collides with any of the obstacles
    for (const obstacle of obstacles) {
      if (
        gamePieceX < obstacle.x + obstacle.width &&
        gamePieceX + 30 > obstacle.x &&
        gamePieceY < obstacle.y + obstacle.height &&
        gamePieceY + 30 > obstacle.y
      ) {
        // If there is a collision, set the game over state to true and play the collision sound
        setIsGameOver(true);
        handleCollision(); // Call the function to play the collision sound
        setShowModal(true);
        return;
      }
    }
  }, [obstacles, gamePieceX, gamePieceY]);

  // Function to update the game area
  const updateGameArea = useCallback(() => {
    if (!isGameStarted || isGameOver || isPaused) {
      return;
    }

    // Adjust game speed based on score
    if (score > 15000) {
      setGameSpeed(0.3);
    } else if (score > 12000) {
      setGameSpeed(0.5);
    } else if (score > 10000) {
      setGameSpeed(1);
    } else if (score > 6000) {
      setGameSpeed(2);
    } else if (score > 3000) {
      setGameSpeed(0.2);
    } else {
      setGameSpeed(5);
    }

    // Increment the score by 1
    setScore((prevScore) => prevScore + 1);

    // Create a new obstacle if there are no obstacles or if the last obstacle is almost at the end of the game area
    if (obstacles.length === 0 || obstacles[obstacles.length - 1].x <= gameAreaWidth - obstacleGap) {
      createObstacle();
    }

    // Move the obstacles and check for collision
    moveObstacles();
    checkCollision();
  }, [isGameStarted, isGameOver, isPaused, obstacles, gameAreaWidth, obstacleGap, createObstacle, moveObstacles, checkCollision, score]);

  
  // Handle key press for game piece movement
  const handleKeyPress = (event) => {
    const key = event.key;
    if (!isGameOver && !isPaused && isGameStarted) {
      if (key === 'ArrowUp') {
        setGamePieceY((prevY) => prevY - 10);
      } else if (key === 'ArrowDown') {
        setGamePieceY((prevY) => prevY + 10);
      } else if (key === 'ArrowLeft') {
        setGamePieceX((prevX) => prevX - 10);
      } else if (key === 'ArrowRight') {
        setGamePieceX((prevX) => prevX + 10);
      }
    }
  };

  // Function to handle starting the game
  const handleStartGame = () => {
    setIsGameStarted(true);
    setShowModal(false);
  };

  // Function to handle pausing the game
  const handlePauseGame = () => {
    setIsPaused(true);
    setShowModal(true);
  };

  // Function to handle resuming the game
  const handleResumeGame = () => {
    setIsPaused(false);
    setShowModal(false);
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    if (isGameOver) {
      setGamePieceX(gameAreaWidth / 2 - gamePieceSize / 2);
      setGamePieceY(gameAreaHeight / 2 - gamePieceSize / 2);
      setObstacles([]);
      setScore(0);
      setIsGameOver(false);
    }

    if (!isPaused) {
      setShowModal(false);
    }
  };

  // Function to handle collision
  const handleCollision = () => {
    const collisionSound = collisionSoundRef.current;
    collisionSound.play(); // Play the collision sound on collision
  };

  // Use effect to start and stop the game loop
  useEffect(() => {
    const interval = setInterval(updateGameArea, gameSpeed);
    return () => {
      clearInterval(interval);
    };
  }, [updateGameArea, gameSpeed]);

  // Use effect to handle the cleanup of collisionSoundRef
  useEffect(() => {
    const collisionSound = collisionSoundRef.current;

    // Cleanup the collision sound when the component unmounts
    return () => {
      collisionSound.pause();
      collisionSound.currentTime = 0;
    };
  }, []);

  // Render the game area
  return (
    <div id="gamearea" tabIndex={0} onKeyDown={handleKeyPress}>
      {/* Use the entire screen for the game area */}
      <Cover style={{ width: '100vw', height: '100vh', position: 'absolute', top: 0, left: 0 }} />

      <Modal show={!isGameStarted || showModal} onHide={handleCloseModal} centered>
        {/* Modal Header */}
        <Modal.Header>
          <Modal.Title>
            {/* Display "Paused" or "Game Over" and the Scoreboard in the same line */}
            <div className="gamePause">
              <div className="scoreboard-box">
                <Scoreboard score={score} />
              </div>
              <div className="button-box">
                {!isGameStarted ? (
                  <Button variant="primary" onClick={handleStartGame}>
                    Start Game
                  </Button>
                ) : isPaused ? (
                  <Button variant="primary" onClick={handleResumeGame}>
                    Continue Playing
                  </Button>
                ) : (
                  <Button variant="primary" onClick={handleCloseModal}>
                    Play Again
                  </Button>
                )}
              </div>
            </div>
          </Modal.Title>
        </Modal.Header>

        {/* Modal Body */}
        <Modal.Body>
          <ObstacleCourseGame />
        </Modal.Body>
      </Modal>

      {/* The game piece */}
      <img
        src={gamePieceImage}
        alt="Game Piece"
        style={{
          position: 'absolute',
          left: gamePieceX,
          top: gamePieceY,
          width: 60,
          height: 30,
        }}
      />

      {/* Render the obstacles */}
      {obstacles.map((obstacle, index) => (
        <Obstacle key={index} {...obstacle} />
      ))}

      {/* Display the score */}
      <p className="score">SCORE: {score}</p>

      {/* Game control buttons */}
      <div style={{ position: 'absolute', bottom: 20, right: 20 }}>
        {/* Cross layout for game control buttons */}
        <div className="game-controls d-flex flex-column align-items-center justify-content-center">
          <div className="d-flex flex-column">
            <button className='myBtn' onClick={() => setGamePieceY((prevY) => prevY - 10)}>
              <FontAwesomeIcon icon={faArrowUp} />
            </button>
          </div>
          <div className="row">
            <div className="col-4">
              <button className='myBtn' onClick={() => setGamePieceX((prevX) => prevX - 10)}>
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
            </div>
            <div className="col-4">
              <button className='myBtn' onClick={isPaused ? handleResumeGame : handlePauseGame}>
                <FontAwesomeIcon icon={isPaused ? faPlay : faPause} />
              </button>
            </div>
            <div className="col-4">
              <button className='myBtn' onClick={() => setGamePieceX((prevX) => prevX + 10)}>
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </div>
          <div className="d-flex flex-column">
            <button className='myBtn' onClick={() => setGamePieceY((prevY) => prevY + 10)}>
              <FontAwesomeIcon icon={faArrowDown} />
            </button>
          </div>
        </div>

        {/* Alert box */}
        <div className="portrait-only">
          <ALertBox />
        </div>
      </div>
    </div>
  );
};

export default GameArea;
