import React from 'react'
import classnames from 'src/lib/utils/classnames'

interface IP {
  children?: React.ReactNode,
  disabled?: boolean,
  accept?: string,
  onFile: (files:any) => void
}

interface IS {
  dragover?: boolean
}

export interface IDropEvent {
  dataTransfer: DataTransfer
}


class UploadDragger extends React.Component<IP, IS> {

  dragover:boolean = false

  onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const {disabled, accept, onFile} = this.props
    if (disabled) return;
    this.dragover = false;
    if (!accept) {
      onFile(e.dataTransfer.files)
      
      return;
    }
    onFile([].slice.call(e.dataTransfer.files).filter((file:File) => {
      const { type, name } = file;
      const extension = name.indexOf('.') > -1
        ? `.${ name.split('.').pop() }`
        : '';
      const baseType = type.replace(/\/.*$/, '');
      return accept.split(',')
        .map(type => type.trim())
        .filter(type => type)
        .some(acceptedType => {
          if (/\..+$/.test(acceptedType)) {
            return extension === acceptedType;
          }
          if (/\/\*$/.test(acceptedType)) {
            return baseType === acceptedType.replace(/\/\*$/, '');
          }
          if (/^[^\/]+\/[^\/]+$/.test(acceptedType)) {
            return type === acceptedType;
          }
          return false;
        });
    }));
  }

  onDragover = (e: React.DragEvent<HTMLDivElement>) => {
    console.log('onDragover')
    if (!this.props.disabled) {
      this.dragover = true
    }
    e.preventDefault()
  }

  onDragleave = () => {
    console.log('onDragleave')
    this.dragover = false;
  }

  get divClassName() {
    const { dragover } = this
    const classNameObj: any = {
      'sy-upload-dragger': true,
      'is-dragover': dragover
    }
    return classnames(classNameObj)
  } 

  render() {
    const {onDrop, onDragover, onDragleave, divClassName, props} = this
    return (
      <div
        className={divClassName}
        onDrop={onDrop}
        onDragOver={onDragover}
        onDragLeave={onDragleave}
      >
        {props.children}
      </div>
    )
  }
}

export default UploadDragger