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
  onClick?: () => void,
  style?: React.CSSProperties
}

const Button: React.FC<IProps> = props => {
  const { 
    type = 'default',
    size,
    icon,
    disabled,
    loading,
    plain,
    round,
    circle,
    onClick,
    nativeType = 'button',
    children,
    style
  } = props


  const buttonStyle = (() => {
    const obj: any = {
      'sy-button': true,
      'is-disabled': !!disabled,
      'is-loading': !!loading,
      'is-plain': !!plain,
      'is-round': !!round,
      'is-circle': !!circle
    }

    obj[`sy-button--${type}`] = !!type
    obj[`sy-button--${size}`] = !!size
    
    return classnames(obj)
  })()
  

  const Loading = (
    <i className="sy-icon-loading"></i>
  )
  const IconLoading = (
    <i className={icon}></i>
  )
  return (
     <button
        onClick={onClick}
        disabled={!!disabled || !!loading}
        type={nativeType}
        className={buttonStyle}
        style={style}
      >
        {loading && Loading }
        {loading && icon && IconLoading}
        <span>{children}</span>
      </button>
  )
}

export default Button
