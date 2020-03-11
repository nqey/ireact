import React from 'react'

interface IP {
  value?: string|Array<string>
  accordion?: boolean
}

const Collapse:React.FC<IP> = props => {
  const {
    value,
    accordion,
    children
  } = props
  return (
    <div className="sy-collapse">
      { children }
    </div>
  )
}

export default Collapse
