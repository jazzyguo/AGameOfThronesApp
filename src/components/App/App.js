import React, { PureComponent } from 'react';
import { Switch, Route } from 'react-router-dom'
import Home from '../Home/Home';
import BookList from '../BookList/BookList';
import Houses from '../Houses/Houses';
import Header from '../Header/Header';
import './App.css';

class App extends PureComponent {  

  constructor(props, context) {
	 super(props);
  }

  render() {
    return (
      <div className="container">
        <Header />
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/books' component={BookList}/>
          <Route path='/houses' component={Houses}/>
        </Switch>
      </div>
    );
  }
}

export default App;