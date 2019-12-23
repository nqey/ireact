import React from 'react'
import ISlotProps from 'src/lib/slot'

interface IProps extends ISlotProps{
  height?: string
}

const Header: React.FC<IProps> = (props: IProps) => {
  return (
    <header className="sy-header" style={{
      'height': props.height || '60px'
    }}>
      {props.children}
    </header>
  )
}

export default Header
