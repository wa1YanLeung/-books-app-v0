import React, { useState} from 'react'

const Search = ({ getQuery, handleSubmit, setSummaryModalOpen,
  items, setMaxAuthor, setPublicationDate }) => {
  
  const [text, setText] = useState('')

  // pass in e.target.value
  const onChange = (q) => {
    setText(q)
    getQuery(q)
  }

  // Get name of the single author who appears most commonly in the results
  // If equal count, get first one
  const funcMaxAuthor = (items) => {
    let authorCounter = new Map();
    let maxCount = 0;
    let maxAuthor = "";

    for (let item of items) {

      let authorsArr = item.volumeInfo.authors;
      if (authorsArr && authorsArr.length !== 0) {
        for (let author of authorsArr) {
          if (authorCounter.has(author)) {
            authorCounter.set(author, authorCounter.get(author) + 1);
          } else {
            authorCounter.set(author, 1);
          }
          if (authorCounter.get(author) > maxCount) {
            maxCount = authorCounter.get(author);
            maxAuthor = author;
          }
        }
      }
    }
    return maxAuthor
  }
// earliest and most recent publication dates
// assume '2015-03' > '2015'
  const funcPublicationDate = (items) => {
  let earliestDate = "";
  let mostRecentDate = "";
  const res = [];  

  for (let item of items) {
      let publishedDate = item.volumeInfo.publishedDate;
      if (publishedDate && publishedDate !== "") {
          let date = new Date(publishedDate);
          // setting earliest date.
          if (earliestDate !== "") {
              if (date < earliestDate) {
                  earliestDate = date;
              }
          } else {
              earliestDate = date;
          }

          // setting most recent date.
          if (mostRecentDate !== "") {
              if (date > mostRecentDate) {
                  mostRecentDate = date;
              }
          } else {
              mostRecentDate = date;
          }
      }
    }
    earliestDate = earliestDate.toISOString().slice(0, 10)
    mostRecentDate = mostRecentDate.toISOString().slice(0, 10)
    res.push(earliestDate, mostRecentDate)
    return res;
  }

  return (
    <div className='search-container'>
      <form className='search-form'
        onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
       >
        <input className='search-from-input'
          type='text'
          placeholder='Search Book by Name'
          value={text}
          onChange={(e) => onChange(e.target.value)}
          required
          autoFocus
          />
        <button type='submit' className='search-form-btn'>
          <i className='fas fa-search'></i>
        </button>
      </form>
      <button
        className="openModalBtn"
        onClick={() => {
          setSummaryModalOpen(true);
          setMaxAuthor(funcMaxAuthor(items));
          setPublicationDate(funcPublicationDate(items))
        }}
      >Search Summary</button>
    </div>
  )
}

export default Search
