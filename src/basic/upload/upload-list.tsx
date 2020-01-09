import React from 'react'
import { UploadFile } from './interface'
import classnames from 'src/lib/utils/classnames'
import UploadLi from './upload-li'

interface IP<T=any> {
  files: Array<UploadFile>
  listType: 'text'|'picture'|'picture-card' // 文件列表的类型
  disabled?: boolean,
  onPreview?: (file: UploadFile) => void
  onRemove?: (file: UploadFile) => void
}

const UploadList: React.FC<IP> = props => {
  const {
    files,
    listType,
    disabled,
    onPreview,
    onRemove
  } = props

  const ulStyle = (() => {
    const obj:any = {}
    obj['sy-upload-list'] = true
    obj['sy-upload-list--' + listType] = true
    obj['is-disabled'] = !!disabled
    return classnames(obj)
  })()

  const renderUploadList = () => {
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
  return renderUploadList()
}

export default UploadList