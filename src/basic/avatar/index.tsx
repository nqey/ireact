import React, { useState } from 'react'

interface IProps {
  icon?: string // 设置头像的图标类型，参考 Icon 组件
  size?: number|'large'|'medium'|'small' // 设置头像的大小
  shape?: 'circle'|'square' // 设置头像的形状
  src?: string // 图片头像的资源地址
  srcSet?: string //以逗号分隔的一个或多个字符串列表表明一系列用户代理使用的可能的图像
  alt?: string // 描述图像的替换文本
  fit?: 'fill'|'contain'|'cover'|'none'|'scale-down' // 当展示类型为图片的时候，设置图片如何适应容器框
  error?: (e:React.SyntheticEvent) => boolean // 图片类头像加载失败的回调， 返回 false 会关闭组件默认的 fallback 行为
}

const Avatar: React.FC<IProps> = props => {
  const {
    icon,
    size = 'large',
    shape = 'circle',
    src,
    alt,
    srcSet,
    fit = 'cover',
    error,
    children
  } = props;

  const [isImageExist, setIsImageExist] = useState(true)

  const avatarClass = (() => {
    let classList = ['sy-avatar'];

    if (size && typeof size === 'string') {
      classList.push(`sy-avatar--${size}`);
    }

    if (icon) {
      classList.push('sy-avatar--icon');
    }

    if (shape) {
      classList.push(`sy-avatar--${shape}`);
    }

    return classList.join(' ');
  })()

  const sizeStyle = typeof size === 'number' ? {
    height: `${size}px`,
    width: `${size}px`,
    lineHeight: `${size}px`
  } : {};

  function handleError(e:React.SyntheticEvent) {
    const errorFlag = error ? error(e) : undefined;
    if (errorFlag !== false) {
      setIsImageExist(false);
    }
  }

  function renderAvatar() {
    if (isImageExist && src) {
      return <img
        src={src}
        onError={handleError}
        alt={alt}
        srcSet={srcSet}
        style={{ 'objectFit': fit }}/>;
    }

    if (icon) {
      return (<i className={icon} />);
    }

    return children;
  }

  return (
    <span className={ avatarClass } style={ sizeStyle }>
      {
        renderAvatar()
      }
    </span>
  )
}

export default Avatar
