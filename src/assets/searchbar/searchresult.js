import React, { useState } from 'react';
import MovieCard from '../moviecard/moviecard';
import MovieDetails from '../moviecard/moviedetails';
import Modal from 'react-bootstrap/Modal';
import './searchstyle.css';
import InfiniteScroll from '../infinitescroll/infinitescroll';
import head from "../../assets/head.jpg"

const SearchResult = ({ results }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="row">
      {results && results.length === 0 ? (
        <>
          {/* <TopRatedMovies /> */}
          <div className="container">
            <div className="row noSearch">
              <div className="col-12 col-md-4">
                <img src={head} alt="" className="img" />
              </div>
              <div className="col-12 col-md-8">
                <div className="searchError">
                  {/* <h2>There was an Error</h2> */}
                  An error occurred during the search process.
                  Please make sure you have entered a valid movie name and try again.
                  If the movie does not exist or has been deleted, it may no longer be available.
                  Please verify your search criteria and try again.
                </div>
              </div>
            </div>
          </div>
  
          {/* THIS WILL DISPLAY THE SLIDER */}
          <InfiniteScroll />
  
        </>
      ) : (
        results && results.map((result) => (
          // Render the MovieCard component for each result
          <MovieCard key={result.id} movie={result} onClick={() => handleMovieClick(result)} />
        ))
      )}
      <Modal
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={selectedMovie !== null}
        onHide={handleCloseModal}
      >
        <Modal.Header closeButton>
          {/* Render the Movie Details */}
          {/* <Modal.Title>Movie Details</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          {/* Render the MovieDetails component with the selected movie */}
          {selectedMovie && <MovieDetails movie={selectedMovie} />}
        </Modal.Body>
      </Modal>
    </div>
  );
  
};

export default SearchResult;
