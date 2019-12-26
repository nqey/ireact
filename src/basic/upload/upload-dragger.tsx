import React from 'react'
import classnames from 'src/lib/utils/classnames'

interface IP {
  children?: React.ReactNode,
  disabled?: boolean,
  accept?: string,
  onFile?: (files:any) => void
}

interface IS {
  dragover?: boolean
}

export interface IDropEvent {
  dataTransfer: DataTransfer
}


class UploadDragger extends React.Component<IP, IS> {

  constructor(props: IP) {
    super(props);
    this.onDrop = this.onDrop.bind(this)
    this.onDragover = this.onDragover.bind(this)
    this.onDragleave = this.onDragleave.bind(this)
    this.getClassName = this.getClassName.bind(this)
    this.state = { dragover: false }
  }

  onDrop(e: IDropEvent) {
    const {disabled, accept, onFile=(files:any) => {}} = this.props
    if (disabled || !accept) return;
    this.setState({dragover: false});
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

  onDragover() {
    if (!this.props.disabled) {
      this.setState({dragover: true});
    }
  }

  onDragleave() {
    this.setState({dragover: false});
  }

  getClassName() {
    const { dragover } = this.state
    const classNameObj: any = {
      'sy-upload-dragger': true,
      'is-dragover': dragover
    }
    return classnames(classNameObj)
  } 

  render() {
    const {onDrop, onDragover, onDragleave, getClassName, props} = this
    return (
      <div
        className={getClassName()}
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