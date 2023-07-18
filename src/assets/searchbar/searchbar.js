import React, { useState, useCallback } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import SearchResult from './searchresult'; // Update the import path with the correct file location
import './searchstyle.css';
import { motion } from 'framer-motion';

const SearchBar = () => {
  // State variables
  const [searchQuery, setSearchQuery] = useState('');
  const [submittedValue, setSubmittedValue] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState(false);

  // Function to handle the search query
  const handleSearch = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_APIKEY}&query=${searchQuery}`
      );

      const searchResults = response.data.results;
      setSearchResults(searchResults);
      setSearchError(false);
    } catch (error) {
      console.error('Error occurred while searching:', error);
      setSearchResults([]);
      setSearchError(true);
    }
  }, [searchQuery]);

  // Function to handle input change in the search bar
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch();
    setSubmittedValue(searchQuery);
    setSearchQuery('');
    setShowModal(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {/* Search form */}
      <Form className="" onSubmit={handleSubmit}>
        {/* adding framer motion animation to the form */}
        <Form.Group as={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 3 }}>
          <Form.Control
            type="search"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={handleInputChange}
            className="custom-form-control"
          />
        </Form.Group>
      </Form>

      {/* Display search results */}
      <div id="search">
        {/* display the searched query as text */}
        {submittedValue && <p>Showing results for <b>{submittedValue}</b></p>}
      </div>

      {/* Modal for displaying search results */}
      <Modal
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModal}
        onHide={handleCloseModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {submittedValue ? (
              /* showing the searched query as a text in modal */
              <p>Showing Results for <b>{submittedValue}</b></p>
            ) : (
              /* showing error message if search is empty or not found */
              <p>Error occurred while searching.</p>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* The main search result */}
          <SearchResult results={searchResults} searchError={searchError} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SearchBar;
