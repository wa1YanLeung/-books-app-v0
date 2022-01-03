import React from 'react'
import BookItem from './BookItem'
import Spinner from '../ui/Spinner'

const BookGrid = ({ items, isLoading}) => {
  return isLoading ? (
    <Spinner />
  ) : (
    <section className='cards'>
      {items.map((item) => (
        <BookItem key={item.id} item={item}></BookItem>
      ))}
    </section>
  )
}

export default BookGrid


