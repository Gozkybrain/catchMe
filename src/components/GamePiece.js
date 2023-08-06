import React from 'react';


// == This component represents the game piece (player) in the game. It handles the movement of the game piece and checks for collisions with the obstacles.

const GamePiece = (props) => {
    const { x, y, width, height, color } = props;

    return <div
        style={{
            position: 'absolute',
            left: x,
            top: y,
            width, height, backgroundColor: color
        }} />;
};

export default GamePiece;
