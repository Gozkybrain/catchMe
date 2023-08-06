import React from 'react';
import head from '../assets/head-bg.svg';
import dp from '../assets/head.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faGithub, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import './ObstacleCourseGame.css'; // Import your CSS file for styling

const ObstacleCourseGame = () => {
  return (
    <div className="user-profile-header">
      {/* Cover Image */}
      <img
        className="cover-image"
        src={head}
        alt="Cover"
      />

      {/* User Info (Profile Image, User Name, Display Name) */}
      
<div className="container">
    <div className="row">
        <div className="col-md-4 col-4">
            {/* Profile Image */}
        <div className="profile-image-container">
          <img
            className="profile-image"
            src={dp}
            alt="Profile"
          />
        </div>
        </div>

        <div className="col-md-8 col-8">
        <div className="user-info">
            {/* User Name  */}
          <h2 className="user-name">Sarcastic Geek</h2>
          <p className="display-name">@gozkybrain</p>
        </div>

          {/* Social Icons */}
          <div className="social-icons">
          <a href="https://twitter.com/gozkybrain4u" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTwitter} className="icon" size="2x" style={{ color: '#1DA1F2' }} /> {/* Twitter */}
          </a>
          <a href="https://facebook.com/izuka.emmanuel" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} className="icon" size="2x" style={{ color: '#1877F2' }} /> {/* Facebook */}
          </a>
          <a href="https://www.linkedin.com/in/gozkybrain-izuka-75612024a" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedin} className="icon" size="2x" style={{ color: '#0077B5' }} /> {/* LinkedIn */}
          </a>
          <a href="https://github.com/gozkybrain" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} className="icon" size="2x" style={{ color: '#333333' }} /> {/* GitHub */}
          </a>
        </div>

        </div>
    </div>
</div>

    </div>
  );
};

export default ObstacleCourseGame;
