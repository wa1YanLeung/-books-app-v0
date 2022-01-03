import React from 'react'
import spinner from '../../img/spinner.gif'

const Spinner = () => {
  return ( <
    img src = {
      spinner
    }
    style = {
      {
        width: '12.5rem',
        margin: 'auto',
        marginTop: '5rem',
        display: 'block'
      }
    }
    alt = 'Loading' /
    >
  )
}

export default Spinner