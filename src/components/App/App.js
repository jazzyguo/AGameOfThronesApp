import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom'
import Home from '../Home/Home';
import BookList from '../BookList/BookList';
import Houses from '../Houses/Houses';
import Header from '../Header/Header';
import Modal from '../Modal/Modal';
import './App.css';

class App extends PureComponent {  

  constructor(props, context) {
	 super(props);
  }

  render() {
    const { modalIsOpen } = this.props;

    return (
      <div className="container">
        <Header />
        {modalIsOpen &&
          <Modal />
        }
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/books' component={BookList}/>
          <Route path='/houses' component={Houses}/>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    modalIsOpen: state.modal.modalIsOpen,
  };
};

export default connect(mapStateToProps, null)(App);