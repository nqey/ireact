import React from 'react'
import { RcFile, UploadFile, IObj } from './interface'
import classnames from 'src/lib/utils/classnames'
import Progress from 'src/basic/progress'

interface IP<T=any> {
  children?: React.ReactNode,
  files?: Array<T>
  disabled?: boolean,
  listType?: 'text'|'picture'|'picture-card' // 文件列表的类型
  handlePreview?: (file: RcFile) => void
  onRemove?: (file: RcFile) => void
}

class UploadList extends React.Component<IP> {
  get listType() {
    return 'picture'
  }

  get files() {
    if (typeof this.props.files === 'undefined') {
      return []
    }
    return this.props.files
  }

  render() {
    const {
      listType,
      files
    } = this


    const {
      onRemove,
      disabled
    } = this.props

    const classNamesObj:IObj = {}
    classNamesObj['sy-upload-list'] = true
    classNamesObj['sy-upload-list--' + listType] = true
    classNamesObj['is-disabled'] = !!disabled

    const list = files.map((file) => {
      const listClassNamesObj:IObj = {}
      listClassNamesObj['sy-upload-list__item'] = true
      listClassNamesObj['is-success'] = true
      // listClassNamesObj['focusing'] = true


      const listClassNamesObj2:IObj = {}
      listClassNamesObj2['sy-icon-upload-success'] = true
      listClassNamesObj2['sy-icon-circle-check'] = true
      listClassNamesObj2['sy-icon-check'] = true
      return (
        <li
          className={classnames(listClassNamesObj)}
          key={file.uid}
          tabIndex={0}
        >
          <img
            className="sy-upload-list__item-thumbnail"
            src={file.url}
          ></img>
          <a className="sy-upload-list__item-name">
            <i className="sy-icon-document"></i>
            {file.name}
          </a>
          <label className="sy-upload-list__item-status-label">
            <i className={classnames(listClassNamesObj2)}></i>
          </label>
          <i className="sy-icon-close" onClick={() => onRemove && onRemove(file)}></i>
          <i className="sy-icon-close-tip"></i>
          <Progress
           type={listType === 'picture-card' ? 'circle' : 'line'}
           strokeWidth={listType === 'picture-card' ? 6 : 2}
           percentage={file.percentage || 0}>
          </Progress>
          {file.percentage || 0}
          <span className="sy-upload-list__item-actions"></span>
        </li>
      )
    })

    return (
      <ul
        className={classnames(classNamesObj)}
      > 
        {list}
      </ul>
    )
  }
}

export default UploadList