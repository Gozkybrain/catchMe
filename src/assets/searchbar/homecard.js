import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuildingColumns, faFileCirclePlus, faCode, faFileContract } from '@fortawesome/free-solid-svg-icons';
import './searchstyle.css';
import { NavLink } from 'react-router-dom';

const Homecard = () => {
  return (
    <div className='homeCard'>
      <div className="container">
        <div className="row">

          {/* Home Link */}
          <div className="col-3 font">
            <div className='font'>
              <NavLink to="/" className="myLinking" activeClassName="current">
                <FontAwesomeIcon icon={faBuildingColumns} /> <br />
                Home
              </NavLink>
            </div>
          </div>

          {/* Recent Link */}
          <div className="col-3 font">
            <div className='font'>
              <NavLink to="/recent" className="myLinking" activeClassName="current">
                <FontAwesomeIcon icon={faFileCirclePlus} /> <br />
                Recent
              </NavLink>
            </div>
          </div>

          {/* Developer Link */}
          <div className="col-3 font">
            <div className='font'>
              <NavLink to="https://www.gozkybrain.com.ng/gee-brain/" className="myLinking" activeClassName="current" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faCode} /> <br />
                Developer
              </NavLink>
            </div>
          </div>

          {/* About Link */}
          <div className="col-3 font">
            <div className='font'>
              <NavLink to="https://github.com/Gozkybrain/watcheMe" className="myLinking" activeClassName="current" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFileContract} /> <br />
                About
              </NavLink>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Homecard;
