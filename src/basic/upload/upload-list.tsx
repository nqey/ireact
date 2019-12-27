import React from 'react'
import { UploadFile, IObj } from './interface'
import classnames from 'src/lib/utils/classnames'
import UploadLi from './upload-li'

interface IP<T=any> {
  files: Array<UploadFile>
  listType: 'text'|'picture'|'picture-card' // 文件列表的类型
  disabled?: boolean,
  onPreview?: (file: UploadFile) => void
  onRemove?: (file: UploadFile) => void
}

class UploadList extends React.Component<IP> {

  get ulStyle() {
    const { disabled, listType } = this.props
    const obj:IObj = {}
    obj['sy-upload-list'] = true
    obj['sy-upload-list--' + listType] = true
    obj['is-disabled'] = !!disabled
    return classnames(obj)
  }

  render() {
    const {
      ulStyle
    } = this

    const {
      files,
      listType,
      onRemove,
      disabled,
      onPreview
    } = this.props

    const List = files.map((file:UploadFile, index) => {
      return (
        <UploadLi
          file={file}
          key={index}
          onPreview={onPreview}
          onRemove={onRemove}
          disabled={!!disabled}
          listType={listType}
        ></UploadLi>
      )
    })
    return (
      <ul
        className={ulStyle}
      > 
        { List }
      </ul>
    )
  }
}

export default UploadList