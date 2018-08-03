import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

class Home extends PureComponent {  

  constructor(props, context) {
	 super(props);
  }

  render() {
    return (
      <div className="home__container">
        <Link className="home__book-link" to='/books'>
              Books
        </Link>
        <Link className="home__houses-link" to='/houses'>
              Houses
        </Link>
      </div>
    );
  }
}

export default Home;