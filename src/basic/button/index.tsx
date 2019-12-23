import React from 'react'
import classnames from 'src/lib/utils/classnames'

interface IProps {
  type?: 'primary'|'success'|'warning'|'danger'|'info'|'text',
  size?: 'medium'|'small'|'mini',
  icon?: string,
  nativeType?:'button' | 'submit' | 'reset',
  loading?: boolean,
  disabled?: boolean,
  plain?: boolean,
  round?: boolean,
  circle?: boolean,
  onClick?: () => void
}

const Button: React.FC<IProps> = (props) => {
  const { 
    type = 'default',
    size,
    disabled,
    loading,
    plain,
    round,
    circle,
    onClick,
    nativeType = 'button',
    children
  } = props

  const classNameObj: any = {
    'sy-button': true,
    'is-disabled': disabled,
    'is-loading': loading,
    'is-plain': plain,
    'is-round': round,
    'is-circle': circle
  }

  classNameObj[`sy-button--${type}`] = !!type
  classNameObj[`sy-button--${size}`] = !!size
  
  const className = classnames(classNameObj)
  return (
     <button
        onClick={onClick}
        disabled={!!disabled || !!loading}
        type={nativeType}
        className={className}
      >
        <span>{children}</span>
      </button>
  )
}

export default Button
