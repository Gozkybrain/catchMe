import React, { useEffect, useState } from 'react';
import './moviestyle.css';
import VideoModal from './videomodal';

const MovieDetails = ({ movie, handleCloseModal }) => {
  const { title, release_date, overview, poster_path, id } = movie;
  const [casts, setCasts] = useState([]);
  const [productionCompanies, setProductionCompanies] = useState([]);

  // Format the release date
  const releaseDate = new Date(release_date);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = releaseDate.toLocaleDateString("en-US", options);

  useEffect(() => {
    // Fetch the cast information from the API
    const fetchCasts = async () => {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_APIKEY}`);
      const data = await response.json();
      setCasts(data.cast);
    };

    // Fetch the movie details including production companies
    const fetchMovieDetails = async () => {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_APIKEY}`);
      const data = await response.json();
      setProductionCompanies(data.production_companies);
    };

    fetchCasts();
    fetchMovieDetails();
  }, [id]);

  return (
    <div>
      
      <div className="container">
        <div className="row">
          <div className='title'>
             {/* Display the movie title */}
            <h2 className='h2'>{title}</h2> <h2 className='h2' id='datePC'>({formattedDate})</h2>
          </div>
          <div className="col-md-6 col-12">
            {/* Display the movie poster */}
            <img src={`https://image.tmdb.org/t/p/w300${poster_path}`} alt={title} className="myThumb" />
              {/* Display the release date */}
              <li className="myCard" id='dateMD'>Release Date: {formattedDate}</li>
              
            <VideoModal /> {/* A component to open the video */}
          </div>

          <div className="col-md-6 col-12">

            {/* Display the movie overview */}
            <p className="myCard">{overview}</p>
          </div>
        </div>
      </div>
       {/* Display the production companies */}
      <h4 className='daddy'>Production Companies:</h4> {productionCompanies.map((company) => company.name).join(", ")}

      {/* Display the casts */}
      <h4 className="daddy">Casts:</h4>
      <div className="row">
        {/* Check if there are casts available */}
        {casts.length > 0 ? (
          // If there are casts, display them
          casts.slice(0, 6).map((cast) => (
            <div className="col-md-2 col-4 watchLogo" key={cast.id}>
              {/* Display the cast image */}
              <img
                src={`https://image.tmdb.org/t/p/w185${cast.profile_path}`}
                alt={cast.name}
                className="castImage"
              />

              {/* Display the cast name */}
              <p id="cast">{cast.name}</p>
            </div>
          ))
        ) : (
          // If no cast information is available
          <div>No cast information available</div>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
