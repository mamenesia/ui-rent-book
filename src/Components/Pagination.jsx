import React from 'react';

const Pagination = ({
  numPerPage,
  totalBooks,
  paginate,
  handleNext,
  handlePrev
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalBooks / numPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className='my-1'>
      <nav aria-label='Page navigation'>
        <ul className='pagination justify-content-center align-items-end'>
          <li className='page-item'>
            <button
              className='page-link'
              aria-label='Previous'
              // eslint-disable-next-line no-undef
              onClick={() => handlePrev(1)}
            >
              <span aria-hidden='true'>&laquo;</span>
            </button>
          </li>
          {pageNumbers.map(number => (
            <li className='page-item' aria-current='page' key={number}>
              <span className='page-link' onClick={() => paginate(number)}>
                {number}
                {/* <span class='sr-only'>(current)</span> */}
              </span>
            </li>
          ))}
          <li className='page-item'>
            <button
              className='page-link'
              aria-label='Next'
              // eslint-disable-next-line no-undef
              onClick={() => handleNext(1)}
            >
              <span aria-hidden='true'>&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
