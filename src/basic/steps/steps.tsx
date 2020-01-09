import React from 'react'
import classnames from 'src/lib/utils/classnames'
import slotProps from 'src/lib/slot/props'

interface IP {
  space?: number|string // 每个 step 的间距，不填写将自适应间距。支持百分比。
  direction?: 'vertical'|'horizontal' // 显示方向
  active?: number // 设置当前激活步骤
  processStatus?: 'wait'|'process'|'finish'|'error'|'success' // 设置当前步骤的状态
  finishStatus?: 'wait'|'process'|'finish'|'error'|'success' // 设置结束步骤的状态
  center?: boolean // 进行居中对齐
  simple?: boolean // 是否应用简洁风格
  stepOffset?: number|string // 简洁风格生效
  children: React.ReactNode
}

const Steps: React.FC<IP> = props => {
  const {
    space = 0,
    direction = 'horizontal',
    active = 0,
    stepOffset = 0,
    processStatus = 'process',
    finishStatus = 'finish',
    center = false,
    simple = false,
    children
  } = props
  
  // 设置step公共参数&计算step状态
  const slotChildren = (() => {
    const statusObj = (() => {
      let statusList:Array<string> = []
      let errorIndex:number|undefined
      React.Children.map(children, (child:any, index: number) => {
        let status = child.props.status
        let internalStatus = ''
        if (active > index) {
          internalStatus = finishStatus;
        } else if (active === index) {
          internalStatus = processStatus;
        } else {
          internalStatus = 'wait';
        }
        if (status === 'error') errorIndex = index
        statusList.push(status || internalStatus)
      })
      return {
        statusList,
        errorIndex
      }
    })()

    const paramsFn = (child:any, index:number) => {
      return {
        space,
        direction,
        statusObj,
        center,
        simple,
        stepOffset,
        processStatus
      }
    }

    return slotProps.set(children, paramsFn)
  })()
  
  // 设置steps样式
  const stepsClass = (() => {
    const obj:any = {}
    obj['sy-steps'] = true
    obj[`sy-steps--${direction}`] = !simple
    obj['sy-steps--simple'] = !!simple
    return classnames(obj)
  })()

  return (
    <div className={stepsClass}>
        {slotChildren}
    </div>
  )
}

export default Steps
