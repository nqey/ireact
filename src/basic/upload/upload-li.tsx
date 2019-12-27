import React from 'react'
import classnames from 'src/lib/utils/classnames'
import Progress from 'src/basic/progress'
import { UploadFile, IObj } from './interface'

interface IPL<T=any> {
  file: UploadFile
  listType: string // 文件列表的类型
  disabled: boolean
  onPreview?: (file: UploadFile) => void
  onRemove?: (file: UploadFile) => void
}

class UploadLi extends React.Component<IPL> {
  state:{
    focusing:boolean
  } = {
   focusing: false
  }

  get liStyle() {
    const obj:IObj = {}
    obj['sy-upload-list__item'] = true
    obj['is-success'] = true
    obj['focusing'] = !!this.state.focusing
    return classnames(obj)
  }

  get iStyle() {
    const { listType } = this.props
    const obj:IObj = {}
    obj['sy-icon-upload-success'] = true
    obj['sy-icon-circle-check'] = listType === 'text'
    obj['sy-icon-check'] = ['picture-card', 'picture'].indexOf(listType) > -1
    return classnames(obj)
  }

  focus = () => {
    this.setState({
      focusing: true
    })
  }

  focusOut = () => {
    this.setState({
      focusing: false
    })
  }

  render() {
    const { file, disabled, onRemove, onPreview, listType } = this.props
    const { liStyle, iStyle, focus, focusOut } = this

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
}

export default UploadLi
