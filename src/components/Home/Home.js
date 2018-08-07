import React, { PureComponent, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './Home.css';

class Home extends PureComponent {  

  constructor(props, context) {
	 super(props);
  }

  render() {
    return (
      <Fragment>
        <Navbar/>
        <div className="home__container">

        </div>
      </Fragment>
    );
  }
}

export default Home;