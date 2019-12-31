import React from 'react'

interface IProps {
  height?: string
}

const Header: React.FC<IProps> = props => {
  const { height = '60px', children } = props
  return (
    <header className="sy-header" style={{
      height
    }}>
      {children}
    </header>
  )
}

export default Header
