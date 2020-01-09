import React from 'react'
import classnames from 'src/lib/utils/classnames'

interface IP {
  title?:string // 标题
  description?: string // 描述性文字
  icon?:string // 传入 icon 的 class 全名来自定义 icon，也支持 参数 方式写入
  status?: 'wait' | 'process' | 'finish' | 'error' | 'success'
  readonly [index: string]: any
}

const Step: React.FC<IP> = props => {

  const {
    space,
    direction,
    center,
    simple,
    stepOffset,
    index,
    statusObj,
    processStatus
  } = props.params

  const {
    status,
    icon,
    description,
    title
  } = props

  const {errorIndex, statusList} = statusObj

  const currentStatus = (() => {
    if (errorIndex !== undefined && errorIndex < index) {
      return 'wait'
    } else {
      return statusList[index]
    }
  })()

  const stepsCount = statusList.length
  const isLast = stepsCount - 1 === index
  const isVertical = direction === 'vertical'
  const isCenter = !!center
  const isSimple = !!simple

  const stepStyle = (function() {
    const style:any = {};
    const iSpace = (typeof space === 'number'
      ? space + 'px'
      : space
        ? space
        : 100 / (stepsCount - (isCenter ? 0 : 1)) + '%');
    style.flexBasis = iSpace;
    if (isVertical) return style;
    if (isLast) {
      style.maxWidth = 100 / stepsCount + '%';
    } else {
      style.marginRight = -stepOffset + 'px';
    }

    return style;
  })()

  const lineStyle = (() => {
    let step = 100;
    const style:any = {};

    style.transitionDelay = 150 * index + 'ms';
    if (status === processStatus) {
      step = currentStatus !== 'error' ? 0 : 0;
    } else if (status === 'wait') {
      step = 0;
      style.transitionDelay = (-150 * index) + 'ms';
    }

    style.borderWidth = step && !isSimple ? '1px' : 0;
    direction === 'vertical'
      ? style.height = step + '%'
      : style.width = step + '%';

    return style;
  })()

  const stepClass = (() => {
    const obj:any = {}
    obj['sy-step'] = true
    obj[`is-${direction}`] = !isSimple
    obj['is-simple'] = isSimple
    obj['is-flex'] = isLast && !space && !isCenter
    obj['is-center'] = isCenter && !isVertical && !isSimple
    return classnames(obj)
  })()

  const SimpleArrow = <div className="sy-step__arrow"></div>
  const SimpleDescription = (
    <div
      className={`sy-step__description is-${currentStatus}`}>
      <span>{ description }</span>
    </div>
  )

  const divIconInner = <div className="sy-step__icon-inner">{ index + 1 }</div>

  return (
    <div
    style={stepStyle}
    className={stepClass}>
    <div
      className={`sy-step__head is-${currentStatus}`}>
      <div
        className="sy-step__line"
      >
        <i className="sy-step__line-inner" style={lineStyle}></i>
      </div>
      <div className={`sy-step__icon is-${icon ? 'icon' : 'text'}`}>
        {currentStatus !== 'success' && currentStatus !== 'error' && !!icon && <i  className={`sy-step__icon-inner ${icon}`}></i>}
        {currentStatus !== 'success' && currentStatus !== 'error' && !icon && !isSimple && divIconInner}
        {
          currentStatus === 'success' || currentStatus === 'error' ?
          <i className={`sy-step__icon-inner is-status sy-icon-${currentStatus === 'success' ? 'check' : 'close'}`}></i>
          :
          ''
        }
      </div>
    </div>
    <div className="sy-step__main">
      <div
        className={`sy-step__title is-${currentStatus}`}
        >
        <span>{ title }</span>
      </div>
      { isSimple ?  SimpleArrow : SimpleDescription}
    </div>
  </div>
  )
}

export default Step
