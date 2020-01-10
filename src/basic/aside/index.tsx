import React from 'react'

interface IProps {
  width?: string
  className?: string
}

const Aside: React.FC<IProps> = props => {
  const {
    width = '300px',
    className,
    children
  } = props

  return (
    <aside className={`sy-aside ${className || ''}`} style={{
      width: !!className ? undefined : width
    }}>
      {children}
    </aside>
  )
}

export default Aside
