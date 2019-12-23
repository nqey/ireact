import React from 'react'

const style = (gutter?: number): object => {
  const ret: {
    paddingLeft?: string
    paddingRight?: string
  } = {};

  if (gutter) {
    ret.paddingLeft = `${gutter / 2}px`;
    ret.paddingRight = ret.paddingLeft;
  }
  return ret;
}

interface IProps {
  span?: number
  tag?: string
  offset?: number
  pull?: number
  push?: number
  xs?: number|object
  sm?: number|object
  md?: number|object
  lg?: number|object
  xl?: number|object
  gutter?: number
  [propName: string]: any;
}

const Col: React.FC<IProps> = (props) => {
  const {
    span = 24,
    tag = 'div',
    offset = 0,
    pull = 0,
    push = 0,
    gutter = props.params.gutter || 0,
    children
  } = props

  let classList: Array<string> = ['sy-col'];

  if (span) classList.push(`sy-col-${span}`)
  if (offset) classList.push(`sy-col-offset-${offset}`)
  if (pull) classList.push(`sy-col-pull-${pull}`)
  if (push) classList.push(`sy-col-push-${push}`)

  const sizes: Array<string> = ['xs', 'sm', 'md', 'lg', 'xl']

  sizes.forEach(size => {
    if (typeof props[size] === 'number') {
      classList.push(`sy-col-${size}-${props[size]}`);
    } else if (typeof props[size] === 'object') {
      let sizeProps = props[size];
      Object.keys(sizeProps).forEach(prop => {
        classList.push(
          prop !== 'span'
            ? `sy-col-${size}-${prop}-${sizeProps[prop]}`
            : `sy-col-${size}-${sizeProps[prop]}`
        )
      })
    }
  })

  return React.createElement(tag, {
    className: classList.join(' '),
    style: style(gutter),
  }, children);

}

export default Col
