import React, { useState } from 'react'
import classnames from 'src/lib/utils/classnames'

interface IP {
  children?: React.ReactNode,
  disabled?: boolean,
  accept?: string,
  onFile: (files:any) => void
}

const UploadDragger: React.FC<IP> = props => {
  const {
    children,
    disabled,
    accept,
    onFile
  } = props

  const [dragover, setDragover] = useState(false)

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (disabled) return
    setDragover(false)
    if (!accept) {
      onFile(e.dataTransfer.files)
      return
    }
    onFile([].slice.call(e.dataTransfer.files).filter((file:File) => {
      const { type, name } = file
      const extension = name.indexOf('.') > -1
        ? `.${ name.split('.').pop() }`
        : ''
      const baseType = type.replace(/\/.*$/, '')
      return accept.split(',')
        .map(type => type.trim())
        .filter(type => type)
        .some(acceptedType => {
          if (/\..+$/.test(acceptedType)) {
            return extension === acceptedType
          }
          if (/\/\*$/.test(acceptedType)) {
            return baseType === acceptedType.replace(/\/\*$/, '')
          }
          if (/^[^\/]+\/[^\/]+$/.test(acceptedType)) {
            return type === acceptedType
          }
          return false
        })
    }))
  }

  const onDragover = (e: React.DragEvent<HTMLDivElement>) => {
    if (!disabled) {
      setDragover(true)
    }
    e.preventDefault()
  }

  const onDragleave = () => {
    setDragover(false)
  }

  const divClassName = (() => {
    const obj: any = {
      'sy-upload-dragger': true,
      'is-dragover': dragover
    }
    return classnames(obj)
  })()

  const renderUploadDragger = () => {
    return (
      <div
        className={divClassName}
        onDrop={onDrop}
        onDragOver={onDragover}
        onDragLeave={onDragleave}
      >
        {children}
      </div>
    )
  }

  return renderUploadDragger()
}

export default UploadDragger
