import React from 'react';
import './moviestyle.css';

const MovieCard = ({ movie, onClick }) => {
  // Destructure the movie object to extract the required properties
  const { title, release_date, poster_path } = movie;

  // Format the release date
  const releaseDate = new Date(release_date);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = releaseDate.toLocaleDateString("en-US", options);

  return (
    <div className="col-md-2 col-6 mb-4">
      <div className="car" onClick={onClick}>
        <div className="cards watchLogo">
          {/* Display the movie poster */}
          <img src={`https://image.tmdb.org/t/p/w300${poster_path}`} alt={title} className="myImg" />

          <div className="card-body ibody">
            {/* Display the movie title */}
            <h5 className="card-title title-text">{title}</h5>

            {/* Display the formatted release date */}
            <p className="card-text title-text">{formattedDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
