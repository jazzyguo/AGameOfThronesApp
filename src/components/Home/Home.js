import React, { PureComponent } from 'react';
import './Home.css';

class Home extends PureComponent {  

  constructor(props, context) {
	 super(props);
  }

  render() {
    return (
      <div className="home__container">
      	<img src="/img/bg1.png" alt=""/>	
      	<span className="home__text-1 home__text">
      	A series of epic fantasy novels by the great 
      	american novelist George R. R. Martin
      	</span>
      	<span className="home__text-2 home__text">
      	These novels take place on the fictional continents
      	of Westeros and Essos, telling the story of a growing dynastic war 
      	among royal families, the rising threat of super-natural powers, and the race
      	to the Iron Throne.
      	</span>
      	<img src="/img/bg2.png" alt=""/>
      </div>
    );
  }
}

export default Home;