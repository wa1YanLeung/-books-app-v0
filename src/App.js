import React, {useState, useEffect} from 'react'
import axios from 'axios'
import BookGrid from './components/books/BookGrid'
import Search from './components/ui/Search'
import Pagination from './components/ui/Pagination'
import SummaryModel from './components/modal/SummaryModal'
import './App.css'

const App = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(10);
  const [summaryModalOpen, setSummaryModalOpen] = useState(false);
  const [responseTime, setResponseTime] = useState(0);
  const [maxAuthor, setMaxAuthor] = useState('')
  const [publicationDate, setPublicationDate] = useState([])
  
  useEffect(() => {
    document.title = "Books App";
  }, [])

  const handleSubmit = () => {
  
    setIsLoading(true);
     const start = window.performance.now();     
      axios
        .get(
          `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=40`
        )
        .then(res => {
          const end = window.performance.now();
          const responseTime = end - start;
          setResponseTime(responseTime);

            if (res.data.items.length > 0) {
              setItems(res.data.items);
              setIsLoading(false);
            }
        })
        .catch(err => {
          setIsLoading(true);
          console.log(err.response);
        });
  }

  // Get current book cards
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = items.slice(indexOfFirstCard, indexOfLastCard);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className='container'>
      <header><h1>books app</h1></header>
      <Search
        getQuery={(q) => setQuery(q)}
        handleSubmit={handleSubmit}
        setSummaryModalOpen={setSummaryModalOpen}
        items={items}
        setMaxAuthor={setMaxAuthor}
        setPublicationDate={setPublicationDate}
      />
      {summaryModalOpen &&
        <SummaryModel
        setSummaryModalOpen={setSummaryModalOpen}
        totalCards={items.length}
        responseTime={responseTime}
        maxAuthor={maxAuthor}
        publicationDate={publicationDate}
      />}
      <BookGrid isLoading={isLoading} items={currentCards}/>
      <Pagination
        cardsPerPage={cardsPerPage}
        totalCards={items.length}
        paginate={paginate}
      />
    </div>
  )
 }
export default App