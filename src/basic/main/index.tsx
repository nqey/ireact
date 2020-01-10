import React from 'react'

interface IP {
  className?:string
}

const Main: React.FC<IP> = props => {
  return (
    <main className={`sy-main ${props.className || ''}`}>
        {props.children}
    </main>
  )
}

export default Main
