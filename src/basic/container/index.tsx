import React from 'react'
import classnames from 'src/lib/utils/classnames'

interface IProps {
  direction?: 'horizontal'|'vertical'
  className?: string
  style?: React.CSSProperties
}

const Container: React.FC<IProps> = props => {
  const { direction, children, style, className } = props
  const obj:any = {}
  obj['sy-container'] = true
  obj['is-vertical'] = direction === 'vertical'
  if (!!className) obj[className] = true
  return (
    <section 
      className={classnames(obj)}
      style={style}
    >
      {children}
    </section>
  )
}

export default Container
