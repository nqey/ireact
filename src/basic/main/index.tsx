import React from 'react'
import ISlotProps from 'src/lib/slot'

interface IProps extends ISlotProps {}

const Main: React.FC<IProps> = (props: IProps) => {
  return (
    <main className='sy-main'>
        {props.children}
    </main>
  )
}

export default Main
