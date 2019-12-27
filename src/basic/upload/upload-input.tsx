import React from 'react'
import ajax from './ajax'
import { RcFile, UploadFile } from './interface'

interface IP<T = any> {
  action: string // 上传的地址
  headers?: any // 设置上传的请求头部
  multiple?: boolean // 是否支持多选文件
  reqs:any // 上传序列
  data?: any // 上传时附带的额外参数
  name: string // 上传的文件字段名
  withCredentials?: boolean // 支持发送 cookie 凭证信息
  drag?: boolean // 是否启用拖拽上传 TODO
  accept?: string // 接受上传的文件类型（thumbnail-mode 模式下此参数无效）
  onRemove?: (file: RcFile) => void // 文件列表移除文件时的钩子
  onSuccess?: (res:T, file: RcFile) => void // 文件上传成功时的钩子
  onError?: (err:Error, file: RcFile) => void // 文件上传失败时的钩子
  onProgress?: (event: { percent: number }, file: RcFile) => void // 文件上传时的钩子
  onChange?: (file: RcFile) => void // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
  onStart?: (file:RcFile) => void
  beforeUpload?: (file:RcFile) => Promise<T> // 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
  listType: 'text'|'picture'|'picture-card' // 文件列表的类型
  autoUpload: boolean // 是否在选取文件后立即进行上传
  fileList: Array<UploadFile> // 上传的文件列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]
  httpRequest?: (o:any) => {} // 上传实现
  disabled?: boolean // 是否禁用
  limit?: number // 最大允许上传个数
  onExceed?: (files:Array<RcFile>) => void // 文件超出个数限制时的钩子
  tiggert?: React.ReactNode
  submit?: React.ReactNode
}

class UploadInput extends React.Component<IP> {

  fileRef?: HTMLInputElement

  setRef = (node: HTMLInputElement) => {
    this.fileRef = node
  };

  get httpRequest() {
    if (typeof this.props.httpRequest === 'undefined') {
      return ajax
    }
    return this.props.httpRequest
  }

  isImage(str:string) {
    return str.indexOf('image') !== -1;
  }

  uploadFiles(files:Array<RcFile>) {
    const {
      autoUpload,
      limit,
      onExceed,
      multiple,
      onStart,
      fileList
    } = this.props

    if (limit && fileList.length + files.length > limit) {
      onExceed && onExceed(files);
      return;
    }

    let postFiles = Array.prototype.slice.call(files);

    if (!multiple) { postFiles = postFiles.slice(0, 1); }

    if (postFiles.length === 0) { return; }

    postFiles.forEach(rawFile => {
      onStart && onStart(rawFile);
      if (!!autoUpload) this.upload(rawFile);
    });
  }

  upload(rawFile:RcFile) {
    const {
      fileRef
    } = this

    if (fileRef) fileRef.value = '';
    
    const {
      beforeUpload,
      onRemove
    } = this.props

    if (!beforeUpload) {
      return this.post(rawFile);
    }

    const before:any = beforeUpload(rawFile);
    if (!!before && before.then) {
      before.then((processedFile:any) => {
        const fileType = Object.prototype.toString.call(processedFile);

        if (fileType === '[object File]' || fileType === '[object Blob]') {
          if (fileType === '[object Blob]') {
            processedFile = new File([processedFile], rawFile.name, {
              type: rawFile.type
            });
          }
          for (const p in rawFile) {
            if (rawFile.hasOwnProperty(p)) {
              processedFile[p] = rawFile[p];
            }
          }
          this.post(processedFile);
        } else {
          this.post(rawFile);
        }
      }, () => {
        !!onRemove && onRemove(rawFile);
      });
    } else if (before !== false) {
      this.post(rawFile);
    } else {
      !!onRemove && onRemove(rawFile);
    }
  }

  post(rawFile:RcFile) {
    const {
      headers,
      withCredentials,
      data,
      action,
      onProgress,
      onSuccess,
      onError,
      reqs,
      name
    } = this.props
    const {
      httpRequest
    } = this
    const options = {
      headers: headers,
      withCredentials: !!withCredentials,
      file: rawFile,
      data: data,
      filename: name,
      action: action,
      onProgress: (event: { percent: number }) => {
        onProgress && onProgress(event, rawFile);
      },
      onSuccess: (res:any) => {
        onSuccess && onSuccess(res, rawFile);
      },
      onError: (err:Error) => {
        onError && onError(err, rawFile);
      }
    };
    reqs[rawFile.uid].xhr = httpRequest && httpRequest(options);
  }

  handleChange = (e: any) => {
    const files = e.target.files;

    if (!files) return;
    this.uploadFiles(files);
  }

  handleClick() {
    if (!this.props.disabled && this.fileRef) {
      this.fileRef.value = '';
      this.fileRef.click();
    }
  }

  handleSubmit() {
    const { reqs } = this.props
    const postFiles: RcFile[] = Object.keys(reqs).map(uid => reqs[uid].raw)
    postFiles.forEach(file => {
      this.upload(file);
    })
  }

  handleKeydown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.target !== e.currentTarget) return;
    if (e.keyCode === 13 || e.keyCode === 32) {
      this.handleClick();
    }
  }

  render() {
    let {
      handleChange,
      handleKeydown,
      setRef
    } = this
    const {
      listType,
      name,
      accept,
      multiple,
      disabled,
      drag,
      tiggert,
      submit
    } = this.props

    if (!!disabled) {
      return (<span></span>)
    }

    return (
      <div className="sy-upload">
        <div
          tabIndex={0}
          className={`sy-upload sy-upload--${listType}`}
          onClick={() => this.handleClick()}
          onKeyDown={handleKeydown}
          >
          { tiggert }
          <input ref={setRef} className="sy-upload__input" type="file" name={name} onChange={handleChange} multiple={multiple} accept={accept}></input>
        </div>
        <div onClick={() => this.handleSubmit()} className="sy-upload sy-upload__submit">
          { submit }
        </div>
      </div>
    )
  }
}

export default UploadInput