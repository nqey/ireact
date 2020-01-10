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
  className?: string
}

const Row: React.FC<IProps> = (props) => {
  const {
    tag = 'div',
    gutter = 0,
    type,
    justify = 'start',
    align = 'top',
    className
  } = props

  const obj: any = {}
  obj['sy-row'] = true
  obj[`is-justify-${justify}`] = justify !== 'start'
  obj[`is-align-${align}`] = align !== 'top'
  obj['sy-row--flex'] = type === 'flex'
  if (!!className) obj[className] = true
  const rowClassList = classnames(obj)
  
  const children = slotProps.set(props.children, () => {
    return {gutter}
  })

  return React.createElement(tag, {
    className: rowClassList,
    style: style(gutter),
  }, children);
}

export default Row
