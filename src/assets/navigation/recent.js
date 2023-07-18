import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import MovieCard from '../moviecard/moviecard';
import MovieDetails from '../moviecard/moviedetails';
import Modal from 'react-bootstrap/Modal';
import '../infinitescroll/scrollstyle.css';

const Recent = () => {
  // State to store the recently added movies
  const [recentlyAddedMovies, setRecentlyAddedMovies] = useState([]);

  // State to store the selected movie for displaying details in the modal
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    // Fetch recently added movies from the API
    const fetchRecentlyAddedMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_APIKEY}&language=en-US&page=1&region=US`
        );
        const data = await response.json();
        // Update the state with the fetched movies
        setRecentlyAddedMovies(data.results.slice(0, 12));
      } catch (error) {
        console.error(error);
      }
    };

    // Call the fetchRecentlyAddedMovies function when the component mounts
    fetchRecentlyAddedMovies();
  }, []);

  // Event handler when a movie card is clicked
  const handleMovieClick = (movie) => {
    // Set the selected movie in the state
    setSelectedMovie(movie);
  };

  // Event handler to close the modal
  const handleCloseModal = () => {
    // Set the selected movie to null to hide the modal
    setSelectedMovie(null);
  };

  return (
    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 1 }}>
      <div>
        {/* Heading */}
        <h2 id='popular'>Recently Added Movies</h2>

        {/* Display movie cards */}
        <div className="row rowBox">
          {recentlyAddedMovies.map((movie) => (
            // Render a MovieCard component for each movie in the recentlyAddedMovies array
            <MovieCard key={movie.id} movie={movie} onClick={() => handleMovieClick(movie)} />
          ))}
        </div>

        {/* Modal to display movie details */}
        <Modal size="xl" show={selectedMovie !== null} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Movie Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Render the MovieDetails component for the selected movie */}
            {selectedMovie && <MovieDetails movie={selectedMovie} />}
          </Modal.Body>
        </Modal>
      </div>
    </motion.div>
  );
};

export default Recent;
