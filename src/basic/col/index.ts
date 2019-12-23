import React from 'react'
import ISlotProps from 'src/lib/slot'

interface IProps extends ISlotProps {
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

const Col = (props: IProps) => {
  const span: number = props.span || 24
  const tag: string = props.tag || 'div'
  const gutter: number = props.gutter || props.params.gutter || 0
  console.log('--------col----------',props)
  interface IStyle {
    paddingLeft?: string
    paddingRight?: string
  }

  let classList: Array<string> = [];
  let style:IStyle = {};

  if (gutter) {
    style.paddingLeft = gutter / 2 + 'px';
    style.paddingRight = style.paddingLeft;
  }

  const actions = ['span', 'offset', 'pull', 'push']

  actions.forEach((prop): void => {
    if (props[prop] || props[prop] === 0) {
      classList.push(
        prop !== 'span'
          ? `sy-col-${prop}-${span}`
          : `sy-col-${props[prop]}`
      )
    }
  })

  const sizes = ['xs', 'sm', 'md', 'lg', 'xl']

  sizes.forEach(size => {
    if (typeof props[size] === 'number') {
      classList.push(`sy-col-${size}-${props[size]}`);
    } else if (typeof props[size] === 'object') {
      let sizeProps = props[size];
      Object.keys(sizeProps).forEach(prop => {
        classList.push(
          prop !== 'span'
            ? `sy-col-${size}-${prop}-${span}`
            : `sy-col-${size}-${props[prop]}`
        )
      })
    }
  })

  return React.createElement(tag, {
    className: classList.join(' '),
    style,
  }, props.children);

}

export default Col
