import React from 'react'
import ISlotProps from 'src/lib/slot'
import classnames from 'src/lib/utils/classnames'

interface IProps extends ISlotProps {
  direction?: string
}

const Container: React.FC<IProps> = (props: IProps) => {
  const classNames = classnames({
    'sy-container': true,
    'is-vertical': props.direction === 'vertical'
  })
  return (
    <section className={classNames}>
      {props.children}
    </section>
  )
}

export default Container
