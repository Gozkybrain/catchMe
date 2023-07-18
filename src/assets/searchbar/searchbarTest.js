// THIS COMPONENT WORKS FOR SEARCH ON CHANGE RATHER THAN ON SUBMIT




import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './searchstyle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchengin } from '@fortawesome/free-brands-svg-icons';

const SearchBar = ({ onSearchResults }) => {
  const [searchQuery, setSearchQuery] = useState('spiderman');

  const handleSearch = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_APIKEY}&query=${searchQuery}`
      );

      const searchResults = response.data.results;
      onSearchResults(searchResults);
      console.log(searchResults);
    } catch (error) {
      console.error('Error occurred while searching:', error);
    }
  }, [searchQuery, onSearchResults]);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  return (
    <Form className="d-flex">
      <Form.Control
        type="search"
        placeholder="Search movies..."
        value={searchQuery}
        onChange={handleInputChange}
        className="mr-2"
        aria-label="Search"
      />
      <Button className="btn-primary myBtn" variant="outline-suc cess" onClick={handleSearch}>
        Search  <FontAwesomeIcon icon={faSearchengin} />
      </Button>
    </Form>
  );
};

export default SearchBar;
