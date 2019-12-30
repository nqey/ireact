import React from 'react'
import UploadInput from './upload-input'
import UploadList from './upload-list'
import { RcFile, UploadFile } from './interface'

interface IP<T = any> {
  showFileList?: boolean // 是否显示已上传文件列表
  action: string // 上传的地址
  headers?: any // 设置上传的请求头部
  multiple?: boolean // 是否支持多选文件
  data?: any // 上传时附带的额外参数
  name?: string // 上传的文件字段名
  withCredentials?: boolean // 支持发送 cookie 凭证信息
  drag?: boolean // 是否启用拖拽上传 TODO
  accept?: string // 接受上传的文件类型（thumbnail-mode 模式下此参数无效）
  onPreview?: (file: UploadFile, rawFiles:Array<UploadFile>) => void // 点击文件列表中已上传的文件时的钩子
  onRemove?: (file: UploadFile, rawFiles:Array<UploadFile>) => void // 文件列表移除文件时的钩子
  onSuccess?: (res:T, file: RcFile, rawFiles:Array<UploadFile>) => void // 文件上传成功时的钩子
  onError?: (err:Error, file: RcFile, rawFiles:Array<UploadFile>) => void // 文件上传失败时的钩子
  onProgress?: (event: { percent: number }, file: RcFile, rawFiles:Array<UploadFile>) => void // 文件上传时的钩子
  onChange?: (file: RcFile, rawFiles:Array<UploadFile>) => void // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
  beforeUpload?: (file:RcFile, rawFiles:Array<UploadFile>) => {} // 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
  beforeRemove?: (file:UploadFile, rawFiles:Array<UploadFile>) => Promise<T> // 删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止删除。
  listType?: 'text'|'picture'|'picture-card' // 文件列表的类型
  autoUpload?: boolean // 是否在选取文件后立即进行上传
  fileList?: Array<T> // 上传的文件列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]
  httpRequest?: (o:any) => {} // 上传实现
  disabled?: boolean // 是否禁用
  limit?: number // 最大允许上传个数
  onExceed?: (files:Array<RcFile>) => void // 文件超出个数限制时的钩子
  submit?: React.ReactNode // 触发器
  tiggert?: React.ReactNode // 触发器
  tip?: React.ReactNode // 提示
}

interface IS {
  uploadFiles: any[]
}

class Upload extends React.Component<IP, IS> {

  constructor(props: IP) {
    super(props);

    this.state = {
      uploadFiles: [...this.fileList]
    };
  }

  reqs: {
    [uid: string]: any
  } = {}

  get type() {
    return 'select'
  }

  get name() {
    return this.props.name || 'file'
  }

  get listType() {
    return this.props.listType || 'text'
  }

  get showFileList() {
    if (typeof this.props.showFileList === 'undefined') {
      return true
    }
    return this.props.showFileList
  }

  get uploadDisabled() {
    return this.props.disabled
  }

  get fileList() {
    if (typeof this.props.fileList === 'undefined') {
      return []
    }
    return this.props.fileList
  }

  get autoUpload() {
    if (typeof this.props.autoUpload === 'undefined') {
      return true
    }
    return this.props.autoUpload
  }

  getFile(rawFile: RcFile): any {
    let fileList = this.state.uploadFiles;
    let target:RcFile[] = fileList.filter((item) => rawFile.uid === item.uid);
    if (target.length) return target[0];
    return null;
  }

  // Event handler
  componentDidMount() {
  }

  componentDidUpdate() {
  }

  handleBeforeUpload = (rawFile: RcFile) => {
    console.log('---------handleBeforeUpload---------')
    const { beforeUpload } = this.props
    const { uploadFiles } = this.state
    let p = new Promise(function(reslove,reject){
      reslove(beforeUpload && beforeUpload(rawFile, uploadFiles))
    })
    return p
  }

  handleStart = (file: RcFile) => {
    console.log('---------handleStart---------')
    file.uid = Date.now() + ''
    let rawFile: UploadFile = {
      url:'',
      status: 'ready',
      uid: file.uid,
      size: file.size,
      name: file.name,
      percentage: 0,
      raw: file,
      xhr: null,
      type: file.type
    }

    this.reqs[file.uid] = rawFile
    
    if (this.listType === 'picture-card' || this.listType === 'picture') {
      try {
        rawFile.url = URL.createObjectURL(file);
      } catch (err) {
        console.error('[Element Error][Upload]', err);
        return;
      }
    }

    this.setState({
      uploadFiles: [...this.state.uploadFiles, rawFile]
    });
  }

  handleProgress = (ev:any, file: RcFile) => {
    console.log('---------handleProgress---------')
    const rawFile = this.getFile(file);
    if (!rawFile) return
    rawFile.status = 'uploading';
    rawFile.percentage = ev.percent || 0;

    const { onProgress } = this.props
    onProgress && onProgress(ev, file, this.state.uploadFiles);
    this.setState({
      uploadFiles: [...this.state.uploadFiles]
    });
  }

  handleSuccess = (res:any, file: RcFile) => {
    console.log('---------handleSuccess---------')
    const rawFile = this.getFile(file);
    if (!rawFile) return
    delete this.reqs[rawFile.uid];
    const fileList = this.state.uploadFiles;
    rawFile.status = 'success';
    rawFile.response = res;

    const { onSuccess, onChange } = this.props
    onSuccess && onSuccess(res, file, fileList);
    onChange && onChange(file, fileList);

    this.setState({
      uploadFiles: [...fileList]
    });
  }

  handleError = (err:any, file: RcFile) => {
    console.log('---------handleError---------')
    const rawFile = this.getFile(file);
    if (!rawFile) return
    delete this.reqs[rawFile.uid];
    const fileList = this.state.uploadFiles;
    rawFile.status = 'error';
    const { onError, onChange } = this.props
    onError && onError(err, file, fileList);
    onChange && onChange(file, fileList);
    fileList.splice(fileList.indexOf(rawFile), 1);
    this.setState({
      uploadFiles: [...fileList]
    })
  }

  handleRemove = (rawFile: UploadFile) => {
    console.log('---------handleRemove---------')
    if (!rawFile) return
    const { onRemove, beforeRemove } = this.props
    let doRemove = () => {
      this.abort(rawFile);
      let fileList = this.state.uploadFiles;
      fileList.splice(fileList.indexOf(rawFile), 1);
      onRemove && onRemove(rawFile, fileList);
      this.setState({
        uploadFiles: [...fileList]
      });
    };

    if (!beforeRemove) {
      doRemove();
    } else if (typeof beforeRemove === 'function') {
      const before:any = beforeRemove && beforeRemove(rawFile, this.state.uploadFiles);
      if (before && before.then) {
        before.then(() => {
          doRemove();
        });
      } else if (before !== false) {
        doRemove();
      }
    }
  }

  abort = (rawFile:UploadFile) => {
    const {
      reqs
    } = this;
    if (rawFile) {
      if (reqs[rawFile.uid]) {
        if (reqs[rawFile.uid].xhr) reqs[rawFile.uid].xhr.abort();
        delete reqs[rawFile.uid];
      }
    } else {
      Object.keys(reqs).forEach((uid) => {
        if (reqs[uid].xhr) reqs[uid].xhr.abort();
        delete reqs[uid];
      });
    }
  }

  handleReview = (rawFile: UploadFile) => {
    console.log('---------handleReview---------')
    this.props.onPreview && this.props.onPreview(rawFile, this.state.uploadFiles)
  }
  
  render() {
    const {
      tiggert,
      submit,
      tip,
      action,
      headers,
      multiple,
      data,
      withCredentials,
      accept,
      httpRequest,
      limit,
      onExceed,
      drag
    } = this.props
    const {
      listType,
      showFileList,
      reqs,
      name,
      handleProgress,
      handleStart,
      handleRemove,
      handleSuccess,
      handleError,
      handleReview,
      handleBeforeUpload,
      uploadDisabled,
      autoUpload
    } = this
    console.log('----autoUpload----', autoUpload)
    const flies:Array<UploadFile> = [...this.state.uploadFiles]

    const uploadList = (
      <UploadList
        onRemove={ handleRemove }
        onPreview={ handleReview }
        files={ flies }
        listType={ listType }
        disabled = { uploadDisabled }
      ></UploadList>
    )
    return (
      <div>
        {listType === 'picture-card' && showFileList && uploadList }
        <UploadInput 
          ref='uploadInner'
          name= { name }
          headers={ headers }
          action={ action }
          data={ data }
          drag= { !!drag }
          reqs={ reqs }
          fileList={ flies }
          tiggert={ tiggert }
          submit= { submit }
          onStart= { handleStart }
          onRemove={ handleRemove }
          onSuccess= { handleSuccess }
          onError= { handleError }
          onProgress={ handleProgress }
          listType={ listType }
          multiple={ !!multiple }
          withCredentials={ !!withCredentials }
          accept={ accept }
          beforeUpload= { handleBeforeUpload }
          autoUpload= { autoUpload }
          httpRequest= { httpRequest }
          disabled = { uploadDisabled }
          limit= { limit }
          onExceed= { onExceed }
        ></UploadInput>
        { !uploadDisabled && tip}
        { listType !== 'picture-card' && showFileList && uploadList }
      </div>
    )
  }
}

export default Upload