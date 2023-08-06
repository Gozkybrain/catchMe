import React from 'react';
import './style.css'

// == This component displays the current score and other game-related information.

const Scoreboard = ({ score }) => {
    return (
      <div className='myScore'>
        SCORE: {score}
      </div>
    );
  };
  
  export default Scoreboard;
