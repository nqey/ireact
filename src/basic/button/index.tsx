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

  const loadingEl = (
    <i className="sy-icon-loading"></i>
  )
  const iconLoadingEl = (
    <i className={icon}></i>
  )
  return (
     <button
        onClick={onClick}
        disabled={!!disabled || !!loading}
        type={nativeType}
        className={className}
        style={style}
      >
        {loading ? loadingEl : ''}
        {loading && icon ? iconLoadingEl : ''}
        <span>{children}</span>
      </button>
  )
}

export default Button
