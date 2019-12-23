import React from 'react'

interface IProps {
  height?: string
}

const Footer: React.FC<IProps> = (props) => {
  const { height = '60xp',  children} = props
  return (
    <footer className="sy-footer" style={{
    	'height': height
    }}>
        {children}
    </footer>
  )
}

export default Footer
