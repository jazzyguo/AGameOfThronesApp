import React, { PureComponent } from 'react';
import './Header.css';

class Header extends PureComponent {  

  constructor(props, context) {
	 super(props);
  }

  render() {
    return (
      <div className="header">
        GAME OF THRONES
      </div>
    );
  }
}

export default Header;