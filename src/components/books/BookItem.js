import React, {useState} from 'react'
import Tooltip from "react-simple-tooltip"
import "../modal/Modal.css";

const BookItem = ({item}) => {

  const [descModalOpen, setDescModalOpen] = useState(false);

  // get description
  const desc = item.volumeInfo.description || "";
  let descDisplay;
  if (desc === "" || desc == null) {
    descDisplay = 'N/A';
  } else {
    descDisplay = desc;
  }

  //get author-title string
  let str = ""
  const authorsArr = item.volumeInfo.authors || [];
  const len = authorsArr.length
  const title = item.volumeInfo.title
  let final = ""
  if (len > 0) {
      for (let i = 0; i < len; i++) {
          if (i === 0) {
              str += authorsArr[0]
          } else {
              str += ' [, ' + authorsArr[i]
          }
      }
    str += ']'.repeat(len - 1)
    final = str += ' - ' + title
  }
  else {
    final = 'No Authors Available - ' + title
  }

  // click on the div and press ESC to close the modal
  const handleKeyDown = (e) => {
  if(e.key === 'Escape'){
    setDescModalOpen(false);
  }
}

  return (
    <div className='book-card'>
      <div className='card-top'>
        <p>{final}</p>
        <Tooltip
          content="Description"
          arrow={5}
          background="#fff"
          border="#000"
          color="#000"
          padding={5}
          placement="bottom"
        >
          <button className='search-detail-btn' 
            onClick={() => {
            setDescModalOpen(true);
            }}>
            <i className='fas fa-ellipsis-v'></i>
          </button>
        </Tooltip>
      </div>
      {descModalOpen &&
        <div className="desc modalContainer" tabIndex="2" onKeyDown={handleKeyDown}>
          <div className="titleCloseBtn">
            <button
              onClick={() => {
                setDescModalOpen(false);
              }}
            >
            X
            </button>
          </div>
          <h2>Description</h2>
          <p className="desc-p">{descDisplay}</p>
        </div>}
    </div>
  )
}

export default BookItem
