import React, { PureComponent } from 'react';
import BookImage from './BookImage';
import { bindAll, debounce } from 'lodash';

class BookListItem extends PureComponent {  

  constructor(props, context) {
    super(props);

    bindAll(this, [
      '_checkVisible'
    ]);

    this.state = {
      visible: true
    }

    this._checkVisible = debounce(this._checkVisible, 150);
  }

  componentDidMount(){
    window.addEventListener('scroll', this._checkVisible);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this._checkVisible);
  }

  /* checks if this element is outside the viewport
   * sets a null img if it is
   */
  _checkVisible() {
    const viewHeight = Math.max(document.documentElement.clientHeight, 
                                window.innerHeight);
    const rect = this.container.getBoundingClientRect();
    const visible = !(rect.bottom < 0 || rect.top - viewHeight >= 0);

    if(this.state.visible !== visible) {
      this.setState({visible});
    } 
  }

  render() {
    const { index, book: { name } } = this.props;
    const { visible } = this.state;
    return (
      <div className="book-list__item"
           ref={(container) => {this.container = container} }>
        {visible &&   
          <BookImage bookName={ name }/>
        }
        {!visible &&
          <img className="book-list__item-img" src={null} alt="" /> 
        }
        <div className="book-list__item-info">
          { name }
        </div>
      </div>
    );
  }
}

export default BookListItem;