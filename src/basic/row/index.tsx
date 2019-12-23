import React from 'react'
import classnames from 'src/lib/utils/classnames'
import slotProps from 'src/lib/slot/props'

const style = (gutter?: number): object => {
  const ret: {
    marginLeft?: string
    marginRight?: string
  } = {};

  if (gutter) {
    ret.marginLeft = `-${gutter / 2}px`;
    ret.marginRight = ret.marginLeft;
  }

  return ret;
}

interface IProps {
  tag?: string
  gutter?: number
  type?: string
  justify?: 'start'|'end'|'center'|'space-around'|'space-between'
  align?: 'top'|'middle'|'bottom'
}

const Row: React.FC<IProps> = (props) => {
  const {
    tag = 'div',
    gutter = 0,
    type,
    justify = 'start',
    align = 'top',
  } = props

  const classNameObj: any = {}
  classNameObj['sy-row'] = true
  classNameObj[`is-justify-${justify}`] = justify !== 'start'
  classNameObj[`is-align-${align}`] = align !== 'top'
  classNameObj['sy-row--flex'] = type === 'flex'
  const className = classnames(classNameObj)
  
  const children = slotProps.set(props.children, {
    gutter
  })

  return React.createElement(tag, {
    className,
    style: style(gutter),
  }, children);
}

export default Row
