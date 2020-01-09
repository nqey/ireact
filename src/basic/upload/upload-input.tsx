import React from 'react'
import ajax from './ajax'
import UploadDragger from './upload-dragger'
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
  beforeUpload: (file:RcFile) => Promise<any> | undefined // 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
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

const UploadInput: React.FC<IP> = props => {
  const {
    action,
    headers,
    multiple,
    reqs,
    data = {},
    name,
    withCredentials,
    drag,
    accept,
    onRemove,
    onSuccess,
    onError,
    onProgress,
    onChange,
    onStart,
    beforeUpload,
    listType,
    autoUpload,
    fileList,
    httpRequest = ajax,
    disabled,
    limit,
    onExceed,
    tiggert,
    submit
  } = props

  let fileRef: HTMLInputElement;

  const setRef = (node: HTMLInputElement) => {
    fileRef = node
  }

  // const isImage = (str:string) => {
  //   return str.indexOf('image') !== -1;
  // }

  const uploadFiles = (files:Array<RcFile>) => {
    if (limit && fileList.length + files.length > limit) {
      onExceed && onExceed(files);
      return;
    }

    let postFiles = Array.prototype.slice.call(files);

    if (!multiple) { postFiles = postFiles.slice(0, 1); }

    if (postFiles.length === 0) { return; }

    postFiles.forEach(rawFile => {
      onStart && onStart(rawFile);
      if (!!autoUpload) upload(rawFile);
    });
  }

  const upload = (rawFile:RcFile) => {
    if (fileRef) fileRef.value = ''

    if (!beforeUpload) {
      return post(rawFile)
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
          post(processedFile);
        } else if (fileType === '[object Object]') {
          Object.assign(data, processedFile)
          post(rawFile);
        } else {
          post(rawFile);
        }
      }, () => {
        !!onRemove && onRemove(rawFile);
      });
    } else if (before !== false) {
      post(rawFile);
    } else {
      !!onRemove && onRemove(rawFile);
    }
  }

  const post = (rawFile:RcFile) => {
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
    console.log('---------post-reqs--------', reqs)
    reqs[rawFile.uid].xhr = httpRequest && httpRequest(options);
  }

  const handleChange = (e: any) => {
    const files = e.target.files;
    onChange && onChange(files)
    if (!files) return;
    uploadFiles(files);
  }

  const handleClick = () => {
    if (!disabled && fileRef) {
      fileRef.value = '';
      fileRef.click();
    }
  }

  const handleSubmit = () => {
    const postFiles: RcFile[] = Object.keys(reqs).map(uid => reqs[uid].raw)
    postFiles.forEach(file => {
      upload(file);
    })
  }

  const handleKeydown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.target !== e.currentTarget) return;
    if (e.keyCode === 13 || e.keyCode === 32) {
      handleClick();
    }
  }

  const renderUploadInput = () => {
    if (!!disabled) {
      return (<span></span>)
    }
    return (
      <div className="sy-upload">
        <div
          tabIndex={0}
          className={`sy-upload sy-upload--${listType}`}
          onClick={handleClick}
          onKeyDown={handleKeydown}
          >
          {
            drag
              ? <UploadDragger disabled={disabled} accept={accept} onFile={uploadFiles}>{tiggert}</UploadDragger>
              : tiggert
          }
          <input ref={setRef} className="sy-upload__input" type="file" name={name} onChange={handleChange} multiple={multiple} accept={accept}></input>
        </div>
        <div onClick={handleSubmit} className="sy-upload sy-upload__submit">
          { submit }
        </div>
      </div>
    )
  }
  return renderUploadInput()
}

export default UploadInput