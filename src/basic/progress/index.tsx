import React, { useState, useEffect } from 'react'
import classnames from 'src/lib/utils/classnames'

interface IP {
  type?: 'line'|'circle'|'dashboard' //进度条类型
  percentage?: number // 百分比（必填）
  strokeWidth?: number // 进度条的宽度，单位 px
  textInside?: boolean // 进度条显示文字内置在进度条内（只在 type=line 时可用）
  status?: 'success'|'exception'|'warning' // 进度条当前状态
  color?: any // 进度条背景色（会覆盖 status 状态颜色）
  width?: number // 环形进度条画布宽度（只在 type 为 circle 或 dashboard 时可用）
  strokeLinecap?: 'butt'|'round'|'square' // circle/dashboard 类型路径两端的形状
  showText?: boolean // 是否显示进度条文字内容
  format?: (param:any) => {}
}

const Progress: React.FC<IP> = props => {
  const {
    type = 'line',
    percentage = 0,
    strokeWidth = 6,
    textInside = false,
    status,
    color = '',
    width = 126,
    strokeLinecap = 'round',
    showText = true,
    format
  } = props

  const getCurrentColor = () => {
    if (typeof color === 'function') {
      return color(percentage)
    } else if (typeof color === 'string') {
      return color
    } else {
      return getLevelColor()
    }
  }

  const getLevelColor = () => {
    const colorArray = getColorArray().sort((a:any, b:any) => a.percentage - b.percentage)

    for (let i = 0; i < colorArray.length; i++) {
      if (colorArray[i].percentage > percentage) {
        return colorArray[i].color
      }
    }
    return colorArray[colorArray.length - 1].color
  }

  const getColorArray = () => {
    const span = 100 / color.length
    return color.map((seriesColor:any, index:any) => {
      if (typeof seriesColor === 'string') {
        return {
          color: seriesColor,
          progress: (index + 1) * span
        }
      }
      return seriesColor
    })
  }

  const barStyle = {
    width: `${percentage}%`,
    backgroundColor: getCurrentColor()
  }
  const relativeStrokeWidth = parseFloat((strokeWidth / width * 100).toFixed(1))
  const radius = (type === 'circle' || type === 'dashboard') ? parseInt(String(50 - relativeStrokeWidth / 2), 10) : 0
  const isDashboard = type === 'dashboard'
  const trackPath = `
    M 50 50
    m 0 ${isDashboard ? '' : '-'}${radius}
    a ${radius} ${radius} 0 1 1 0 ${isDashboard ? '-' : ''}${radius * 2}
    a ${radius} ${radius} 0 1 1 0 ${isDashboard ? '' : '-'}${radius * 2}
    `
  const perimeter = 2 * Math.PI * radius
  const rate = isDashboard ? 0.75 : 1
  const strokeDashoffset = `${-1 * perimeter * (1 - rate) / 2}px`
  const trailPathStyle = {
    strokeDasharray: `${(perimeter * rate)}px, ${perimeter}px`,
    strokeDashoffset: strokeDashoffset
  }
  const circlePathStyle = {
    strokeDasharray: `${perimeter * rate * (percentage / 100) }px, ${perimeter}px`,
    strokeDashoffset: strokeDashoffset,
    transition: 'stroke-dasharray 0.6s ease 0s, stroke 0.6s ease'
  }
  const stroke = (() => {
    let ret
    if (color) {
      ret = getCurrentColor()
    } else {
      switch (status) {
        case 'success':
          ret = '#13ce66'
          break
        case 'exception':
          ret = '#ff4949'
          break
        case 'warning':
          ret = '#e6a23c'
          break
        default:
          ret = '#20a0ff'
      }
    }
    return ret
  })()
  const iconClass = (() => {
    if (status === 'warning') {
      return 'sy-icon-warning'
    }
    if (type === 'line') {
      return status === 'success' ? 'sy-icon-circle-check' : 'sy-icon-circle-close'
    } else {
      return status === 'success' ? 'sy-icon-check' : 'sy-icon-close'
    }
  })()
  const progressTextSize = type === 'line' ? 12 + strokeWidth * 0.4 : width * 0.111111 + 2 
  const content = (() => {
    if (typeof format === 'function') {
      return format(percentage) || ''
    } else {
      return `${percentage}%`
    }
  })()

  const renderProgress = () => {

    const ProgressLineContent = (
      <div className="sy-progress-bar__innerText">{content}</div>
    )

    const ProgressLine = (
      <div className="sy-progress-bar">
        <div className="sy-progress-bar__outer" style={{height: strokeWidth + 'px'}}>
          <div className="sy-progress-bar__inner" style={barStyle}>
            {showText && textInside ? ProgressLineContent : ""}
          </div>
        </div>
      </div>
    )

    const ProgressCircle = (
      <div className="sy-progress-circle" style={{height: width + 'px', width: width + 'px'}}>
        <svg viewBox="0 0 100 100">
          <path
            className="sy-progress-circle__track"
            d={trackPath}
            stroke="#e5e9f2"
            strokeWidth={relativeStrokeWidth}
            fill="none"
            style={trailPathStyle}></path>
          <path
            className="sy-progress-circle__path"
            d={trackPath}
            stroke={stroke}
            fill="none"
            strokeLinecap={strokeLinecap}
            strokeWidth={percentage ? relativeStrokeWidth : 0}
            style={circlePathStyle}></path>
        </svg>
      </div>
    )

    const ProgressTextContent = (
      <span>{content}</span>
    )

    const ProgressTextIcon = (
      <i className={iconClass}></i>
    )

    const ProgressText = (
      <div
        className="sy-progress__text"
        style={{fontSize: progressTextSize + 'px'}}
      >
        {!status ? ProgressTextContent : ProgressTextIcon }
      </div>
    )

    const progressClassName = (() => {
      const obj:any = {}
      obj['sy-progress'] = true
      obj['sy-progress--' + type] = true
      obj['is-' + status] = !!status
      obj['sy-progress--without-text'] = !showText
      obj['sy-progress--text-inside'] = !!textInside

      return classnames(obj)
    })()

    return (
      <div
        className={ progressClassName }
      >
        {type === 'line' ? ProgressLine : ProgressCircle}
        {showText && !textInside ? ProgressText : ""}
      </div>
    )
  }
  return renderProgress()
}

export default Progress