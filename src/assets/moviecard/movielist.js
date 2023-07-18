import React from 'react';
import MovieCard from './moviecard';

const MovieList = ({ movies }) => {
  return (
    <div className="row">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id} // Unique key for each MovieCard component
          movieTitle={movie.title} // Pass the movie title as a prop to the MovieCard component
          releaseYear={movie.releaseYear} // Pass the release year as a prop to the MovieCard component
          thumbnailURL={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} // Construct the thumbnail URL using the poster_path prop and pass it as a prop to the MovieCard component
        />
      ))}
    </div>
  );
};

export default MovieList;
