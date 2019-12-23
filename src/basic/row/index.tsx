import React from 'react'
import ISlotProps from 'src/lib/slot'
import classnames from 'src/lib/utils/classnames'
import setSlotProps from 'src/lib/utils/slotProps'

interface IProps extends ISlotProps {
  tag?: string
  gutter?: number
  type?: string
  justify?: string
  align?: string
}

const style = (gutter?: number): object => {
  interface IRet {
    marginLeft?: string
    marginRight?: string
  }
  const ret: IRet = {};

  if (gutter) {
    ret.marginLeft = `-${gutter / 2}px`;
    ret.marginRight = ret.marginLeft;
  }

  return ret;
}

const Row = (props: IProps) => {
  const tag: string = props.tag || 'div'
  const justify: string = props.justify || 'start'
  const align: string = props.align || 'top'

  interface IObj {
    [propName: string]: any;
  }

  const classNameObj:IObj = {}
  classNameObj['sy-row'] = true
  classNameObj[`is-justify-${justify}`] = justify !== 'start'
  classNameObj[`is-align-${align}`] = align !== 'top'
  classNameObj['sy-row--flex'] = props.type === 'flex'
  const className = classnames(classNameObj)
  
  const children = setSlotProps(props.children, {
    gutter: props.gutter
  })

  return React.createElement(tag, {
    className,
    style: style(props.gutter),
  }, children);
}

export default Row
