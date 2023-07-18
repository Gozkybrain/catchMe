import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal'; // Import the Modal component from react-bootstrap
import './moviestyle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';

const VideoModal = () => {
  const [showModal, setShowModal] = useState(false); // Define a state variable to track the modal's visibility

  const handleOpenModal = () => {
    setShowModal(true); // Function to open the modal by setting the showModal state to true
  };

  const handleCloseModal = () => {
    setShowModal(false); // Function to close the modal by setting the showModal state to false
  };

  return (
    <div>
      <button onClick={handleOpenModal} className="video">
        <FontAwesomeIcon icon={faYoutube} /> watchMe
      </button>

      <Modal show={showModal} onHide={handleCloseModal} size="xl"> {/* Modal component from react-bootstrap */}
        <Modal.Body>
          <div className="video-container">
            <iframe
              title="YouTube Video"
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/cqGjhVJWtEg?autoplay=1"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <p onClick={handleCloseModal}>Close</p>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default VideoModal;



