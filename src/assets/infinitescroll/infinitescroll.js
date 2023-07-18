import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './scrollstyle.css'
import MovieDetails from '../moviecard/moviedetails';
import Modal from 'react-bootstrap/Modal';
// import TopRatedMovies from '../moviecard/toprated';

const InfiniteScroll = () => {
  // State variables for movies and selectedMovie
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Fetch movies from API when the component mounts
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_APIKEY}`
        );
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error('Error occurred while fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  // Function to handle click on a movie
  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  // Configuration settings for the Slider component
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  return (
    <div>

      <h2 id='popular'>Movies of the Week</h2>
      {/* Slider component to display movie posters */}
      <Slider {...settings}>
        {movies.map((movie) => (
          <div key={movie.id} onClick={() => handleMovieClick(movie)} className='watchLogo'>
            <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} className='sliding' />
            <h3 className='slideText'>{movie.title}</h3>
          </div>
        ))}
      </Slider>

     



      {/* Modal component to display movie details */}
      <Modal show={selectedMovie !== null} onHide={handleCloseModal} size="lg">
        <Modal.Body>
          {selectedMovie && <MovieDetails movie={selectedMovie} handleCloseModal={handleCloseModal} />}
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleCloseModal} className="btn btn-secondary">
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default InfiniteScroll;
