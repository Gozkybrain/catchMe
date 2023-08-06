import React from 'react';
import GameArea from './components/GameArea';
// import Cover from './components/AppCover/Cover';
import './components/style.css';
import 'animate.css';

// We bring all the components together and assemble the game.
// Render the ObstacleCourseGame component, which will, in turn, render all the other components required for the game. 
// This is where the magic happens, and your obstacle course game comes to life!


const App = () => {
  return (
    <div>
      <GameArea />
      {/* <Cover /> */}
    </div>
  );
};

export default App;

