import React from 'react'

interface IProps {
  direction?: 'horizontal'|'vertical',
  contentPosition?: 'left'|'right'|'center',
  margin?:any
  width?:any
}

const Divider: React.FC<IProps> = props => {
  const { 
    direction = 'horizontal',
    contentPosition = 'center',
    children,
    margin = '24px 0',
    width = 'auto'
  } = props

  const directionDom = (
    <div
      className={`sy-divider__text is-${contentPosition}`}
     >
      {children}
    </div>
  );

  return (
    <div
        className={`sy-divider sy-divider--${direction}`} style={{
          margin,
          width
        }}
    >
        {direction !== 'vertical' ? directionDom : ''}
    </div>
  )
}

export default Divider
