import React, { useState } from 'react'
import classnames from 'src/lib/utils/classnames'
import Progress from 'src/basic/progress'
import { UploadFile } from './interface'

interface IP<T=any> {
  file: UploadFile
  listType: string // 文件列表的类型
  disabled: boolean
  onPreview?: (file: UploadFile) => void
  onRemove?: (file: UploadFile) => void
}


const UploadLi: React.FC<IP> = props => {
  const {
    file,
    listType,
    disabled,
    onPreview,
    onRemove
  } = props

  const [focusing, setFocusing] = useState(false)

  const focus = () => {
    setFocusing(true)
  }

  const focusOut = () => {
    setFocusing(false)
  }

  const liStyle = (() => {
    const obj:any = {}
    obj['sy-upload-list__item'] = true
    obj['is-' + (file.status || 'success')] = true
    obj['focusing'] = focusing
    return classnames(obj)
  })()

  const iStyle = (() => {
    const obj:any = {}
    obj['sy-icon-upload-success'] = true
    obj['sy-icon-circle-check'] = listType === 'text'
    obj['sy-icon-check'] = ['picture-card', 'picture'].indexOf(listType) > -1
    return classnames(obj)
  })()

  const UploadProgress = (
    <Progress
     type={listType === 'picture-card' ? 'circle' : 'line'}
     strokeWidth={listType === 'picture-card' ? 6 : 2}
     percentage={file.percentage || 0}>
    </Progress>
  )

  const Img = (
    <img
      className="sy-upload-list__item-thumbnail"
      src={file.url}
      alt="稍等一下"
    ></img>
  )

  const IconClose = <i className="sy-icon-close" onClick={() => onRemove && onRemove(file)}></i>
    
  const IconCloseTip = <i className="sy-icon-close-tip"></i>

  const ItemDelete = (
    <span className="sy-upload-list__item-delete">
      <i className="sy-icon-delete" onClick={() => onRemove && onRemove(file)}></i>
    </span>
  )

  const ItemActions = (
    <span className="sy-upload-list__item-actions">
      <span
        className="sy-upload-list__item-preview"
        onClick={() => onPreview && onPreview(file)}
      >
        <i className="sy-icon-zoom-in"></i>
      </span>
      { !disabled && ItemDelete }
    </span>
  )

  const renderLi = () => {
    return (
      <li
        className={liStyle}
        tabIndex={0}
        onClick={focus}
        onFocus={focus}
        onBlur={focusOut}
      >
        {['picture-card', 'picture'].indexOf(listType) > -1 && Img}
        <a className="sy-upload-list__item-name" onClick={() => onPreview && onPreview(file)}>
          <i className="sy-icon-document"></i>
          {file.name}
        </a>
        <label className="sy-upload-list__item-status-label">
          <i className={iStyle}></i>
        </label>
        { !disabled ? IconClose : ''}
        { !disabled ? IconCloseTip : '' }
        { file.status === 'uploading' && UploadProgress }
        { listType === 'picture-card' && ItemActions }
      </li>
    )
  }

  return renderLi()
}

export default UploadLi
