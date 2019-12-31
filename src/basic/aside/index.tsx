import React from 'react'

interface IProps {
  width?: string
}

const Aside: React.FC<IProps> = props => {
  const {
  	width = '300px',
  	children
  } = props
  return (
    <aside className="sy-aside" style={{
      width
    }}>
      {children}
    </aside>
  )
}

export default Aside
