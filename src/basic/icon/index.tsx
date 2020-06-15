import React from 'react'

interface IProps {
  name: string
}

const Icon: React.FC<IProps> = props => {
  return (
    <i className={'sy-icon-' + props.name}></i>
  )
}

export default Icon
