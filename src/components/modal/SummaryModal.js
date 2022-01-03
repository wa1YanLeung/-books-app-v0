import React from "react";
import "./Modal.css";

function SummaryModal({ setSummaryModalOpen, totalCards, responseTime, maxAuthor, publicationDate }) {
  // click on the div and press ESC to close the modal
  const handleKeyDown = (e) => {
    if(e.key === 'Escape'){
      setSummaryModalOpen(false);
    }
  }

  return (
    // tabIndex makes the div focusable to allow onKeyDown
    <div className="modalContainer" tabIndex="1" onKeyDown={handleKeyDown}> 
      <div className="titleCloseBtn">
        <button
          onClick={() => {
            setSummaryModalOpen(false);
          }}
        >
          X
        </button>
      </div>
      <p><strong>Total number of search result:</strong> {totalCards}</p>
      <br/>
      <p><strong>Name of the single author who appears most commonly:</strong></p>
      <p>{maxAuthor}</p>
      <br/>
      <p><strong>Earliest publication date:</strong>{publicationDate[0]}</p>
      <br/>
      <p><strong>Most recent publication date:</strong>{publicationDate[1]}</p>
      <br/>
      <p><strong>Server response time:</strong> {responseTime + 'ms'}</p>
      
    </div>
  );
}

export default SummaryModal;
