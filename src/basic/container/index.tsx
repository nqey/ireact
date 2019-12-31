import React from 'react'
import classnames from 'src/lib/utils/classnames'

interface IProps {
  direction?: 'horizontal'|'vertical'
}

const Container: React.FC<IProps> = props => {
  const { direction, children } = props
  return (
    <section className={classnames({
    'sy-container': true,
    'is-vertical': direction === 'vertical'
    })}>
      {children}
    </section>
  )
}

export default Container
