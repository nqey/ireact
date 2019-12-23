import React from 'react'
import ISlotProps from 'src/lib/slot'

interface IProps extends ISlotProps{
  height?: string
}

const Footer: React.FC<IProps> = (props: IProps) => {
  return (
    <footer className="sy-footer" style={{
    	'height': props.height || '60px'
    }}>
        {props.children}
    </footer>
  )
}

export default Footer
