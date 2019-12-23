import React from 'react'
import classnames from 'src/lib/utils/classnames'

interface IProps {
  direction?: 'horizontal'|'vertical'
}

const Container: React.FC<IProps> = (props) => {
  const { direction, children } = props
  const classNames = classnames({
    'sy-container': true,
    'is-vertical': direction === 'vertical'
  })
  return (
    <section className={classNames}>
      {children}
    </section>
  )
}

export default Container
