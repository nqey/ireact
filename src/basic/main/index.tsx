import React from 'react'

const Main: React.FC = props => {
  return (
    <main className='sy-main'>
        {props.children}
    </main>
  )
}

export default Main
