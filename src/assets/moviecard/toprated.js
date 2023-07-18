import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import MovieDetails from '../moviecard/moviedetails';
import Modal from 'react-bootstrap/Modal';
import '../infinitescroll/scrollstyle.css';
import InfiniteScroll from '../infinitescroll/infinitescroll';

const TopRatedMovies = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Fetch the top-rated movies from the API
  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_APIKEY}`
        );
        const data = await response.json();
        setMovies(data.results.slice(0, 12)); // Limit to 12 top-rated movies
      } catch (error) {
        console.error('Error occurred while fetching top-rated movies:', error);
      }
    };

    fetchTopRatedMovies();
  }, []);

  // Handle click on a movie card
  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  // Handle closing the movie details modal
  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 1 }}>
      <div>
        {/* Render the InfiniteScroll component */}
        <>
          <InfiniteScroll />
        </>

        {/* Render the heading */}
        <h2 id="popular">Top Rated Movies</h2>

        {/* Render the movie cards */}
        <div className="row myBox">
          {movies.map((movie) => (
            <div key={movie.id} className="col-md-2 col-4 mb-4">
              <div className="movie-card fullBox watchLogo" onClick={() => handleMovieClick(movie)}>
                {/* Render the movie image */}
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-images ratedBox"
                />
                
                {/* Render the movie title */}
                <h3 className="movie-title slideText">{movie.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Render the movie details modal */}
        <Modal show={selectedMovie !== null} onHide={handleCloseModal} size="lg">
          <Modal.Body>
            {/* Render the MovieDetails component */}
            {selectedMovie && <MovieDetails movie={selectedMovie} handleCloseModal={handleCloseModal} />}
          </Modal.Body>
          <Modal.Footer>
            {/* Render the close button */}
            <button onClick={handleCloseModal} className="btn btn-secondary">
              Close
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    </motion.div>
  );
};

export default TopRatedMovies;
