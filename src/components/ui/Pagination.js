import React from "react";

const Pagination = ({ cardsPerPage, totalCards, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
    pageNumbers.push(i);
  }

  // const handleKeyDown = (e, number) => {
  //   if (e.key === 'ArrowRight') {
  //     paginate(number);
  //   }
  // }
 
  return (
    <nav aria-label="Pagination" className="nav">
      <ul className="pagination pagination-lg">
        {pageNumbers.map(number => (
          <li key={number}>
            <a
              role="button"
              onClick={() => paginate(number)}
              // onKeyDown={e=>handleKeyDown(e, number)}
              href="/#"
              aria-label={"Go to page" + number}
              className="page-link"
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );

};

export default Pagination;