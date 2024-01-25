import React from "react";
import { useRef } from "react";
import { GrPrevious, GrNext } from "react-icons/gr";

export const Pagination = ({ cardsPerPage, totalCards, paginate }) => {
  // current page using useref for avoide rerendering of current value
  const current = useRef(1);

  // Find all pages having six cards
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
    pageNumbers.push(i);
  }

  // fuction for previous page
  const prevPage = () => {
    if (current.current > 1) {
      current.current--;
      paginate(current.current);
    }
  };

  // lenght of total pages
  let totalPages = pageNumbers.length;

  // fuction for next page
  const nextPage = () => {
    if (pageNumbers[current.current] <= totalPages) {
      paginate(current.current + 1);
      current.current++;
    }
  };

  return (
    <div>
      {pageNumbers.length > 1 ? (
        <div className="flex">
          {/* Previous Page button. */}
          <div className="mt-0.5">
            <button onClick={prevPage} title="Previous Page">
              <GrPrevious className="opacity-60 transition ease-in-out delay-60 duration-300  hover:-translate-x-1 hover:scale-60" />
            </button>
          </div>
          {/* Display current page of total pages. */}
          <span className="text-slate-500 px-8">
            {current.current} / {pageNumbers.length}
          </span>
          {/* Next Page button. */}
          <div className="mt-0.5">
            <button onClick={nextPage} title="Next Page">
              <GrNext className="opacity-60 transition ease-in-out delay-60 duration-300  hover:translate-x-1 hover:scale-60" />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
