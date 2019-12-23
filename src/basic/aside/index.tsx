import React from 'react'
import ISlotProps from 'src/lib/slot'

interface IProps extends ISlotProps{
  width?: string
}

const Aside: React.FC<IProps> = (props: IProps) => {
  return (
    <aside className="sy-aside" style={{
      'width': props.width || '300px'
    }}>
      {props.children}
    </aside>
  )
}

export default Aside
