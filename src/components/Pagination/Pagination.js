import  React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindAll } from 'lodash';
import './Pagination.css';
 
/* Pagination component which allows for page navigation
   **RULES**
 * - if one total page, then show one page with no next/prev
 * - if 6 or less total pages, then simply show all pages
 * - if total pages > 6 && current page >= 4 render left dots
 * - if total pages > 6 && current page >= 4 
     && current page < total pages -4 then render left AND right dots
 * - if total pages > 6 && current page >= total pages - 3 
     then only render left dots
 * - Renders prev button if current page is not the first
 * - Renders next button if current page is not the last
 */

class Pagination extends PureComponent {

  constructor(props) {
    super(props);

    bindAll(this, [
      '_scrollUp'
    ]);

    this.state = {
      currPage: 1
    }
  }

  componentWillReceiveProps(nextProps) {
    const { currPage } = nextProps;
    this.setState({currPage});
  }

  /* Renders and filters through the middle 
   * portion of the pagination
   */
  _renderMiddlePages() {
    const { currPage } = this.state;
    const { totalPages } = this.props;
    let pagination = [];

    // creates all (1, totalPages] pagination - exclusive
    // maintains only four at a time
    for(let i=1;i<totalPages-1;i++){
      pagination.push(i+1);
    }
    // render first 4 pages when on first 3 pages
    if(currPage <= 3){
      pagination = pagination.filter((x) => x < 6);
    // render pages with the current page as the second number
    } else if(currPage >= 4 && currPage < totalPages-3) {
      pagination = pagination.filter((x) => x >= currPage-1 && x < currPage + 3);
    // renders last 4 pages 
    } else if(currPage >= totalPages-3 && currPage <= totalPages) {
      pagination = pagination.filter((x) => x >= totalPages-4 && x < totalPages);
    } 
    const pages = pagination.map((page, i) => 
      <span className={`pagination__item 
                      ${currPage === page ? 'pagination__item--selected' : null}`}
            key={i} onClick={() => this._goToPage(page)}> {page} </span>
    );
    return pages;
  }

  /* @ {pageNum} Int - Goes to this page in pagination
   */
  _goToPage(pageNum) {
    const { goToPage } = this.props;

    this._scrollUp();
    goToPage(pageNum);
  }

  // animates window scrolling to top
  _scrollUp() {
     const step = 100;
     const d = document.documentElement

     window.scrollBy(0, -step);
     if(d.scrollTop === 0) {
       // eslint-disable-next-line
       clearTimeout(scroll);
       return;
     }
     let scroll = setTimeout(() => {
      this._scrollUp()
    },20);
  };

  /* Renders the pagination in the following format
   * {Prev} {First Page} {...} {page page page page} {....} {Last page} {Next}
   */
  render() {
    const { currPage, totalPages } = this.props;

    return(
      <div className="pagination">

       {/* PREV BUTTON */}
       {currPage !== 1 &&
        <span className="pagination__prev"
              onClick={() => this._goToPage(currPage-1)}>Prev</span>
       }

       {/* FIRST PAGE */}
       <span className={`pagination__item 
                       ${currPage === 1 ? 'pagination__item--selected' : null}`}
             onClick={() => this._goToPage(1)}>1</span>

       {/* LEFT DOTS */}
       {currPage > 3 && totalPages > 6 &&
        <span>...</span>
       }

       {/* MIDDLE PAGES */}
       { this._renderMiddlePages() }

       {/* RIGHT DOTS */}
       {currPage < totalPages -3 && totalPages > 6 &&
        <span>...</span>
       }

       {/* LAST PAGE */}
       {totalPages !== 1 &&
        <span className={`pagination__item
                        ${currPage === totalPages ? 'pagination__item--selected' : null}`}
              onClick={() => this._goToPage(totalPages)}>{totalPages}</span>
       }

       {/* NEXT BUTTON */}
       {currPage !== totalPages &&
          <span className="pagination__next"
                onClick={() => this._goToPage(currPage+1)}>Next</span>
       }

      </div>
    )
  }
}

/*
 * {currPage} - current page of the pagination
 * {goToPage} - function passed from parent
 * {totalPages} - pages of pagination
 */
Pagination.propTypes = {
  currPage: PropTypes.number,
  goToPage: PropTypes.function,
  totalPages: PropTypes.number
};

export default Pagination;