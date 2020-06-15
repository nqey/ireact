import React from 'react'
import classnames from 'src/lib/utils/classnames'

interface IProps {
  header?: React.ReactNode|string
  shadow?: 'always'|'hover'|'never',
  bodyStyle?: React.CSSProperties,
  className?: string
}

const Button: React.FC<IProps> = props => {
  const { 
    header,
    shadow = 'always',
    bodyStyle,
    className,
    children
  } = props

  const headerDom = (
    <div className="sy-card__header">
      {header}
    </div>
  );

  return (
    <div className={`sy-card is-${shadow}-shadow ${className}`}>
        {header ? headerDom : ''}
        <div className="sy-card__body" style={bodyStyle}>
          {children}
        </div>
  	</div>
  )
}

export default Button
