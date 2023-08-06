import React from 'react';

// == This component represents an obstacle in the game. It handles the position and rendering of the obstacles on the game area.


// ** Obstacle component represents an obstacle in the game.
const Obstacle = ({ x, y, width, height, color, border, borderRadius }) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width,
        height,
        backgroundColor: color,
        border,
        borderRadius,
      }}
    />
  );
};

export default Obstacle;

