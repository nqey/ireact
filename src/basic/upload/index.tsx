import React from 'react'
import UploadInput from './upload-input'
import UploadList from './upload-list'
import {
  Button,
} from 'src/basic';
import { RcFile, UploadFile, IObj } from './interface'

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
  onPreview?: (file: RcFile) => void // 点击文件列表中已上传的文件时的钩子
  onRemove?: (file: RcFile, files:Array<UploadFile>) => void // 文件列表移除文件时的钩子
  onSuccess?: (res:T, file: RcFile, files:Array<UploadFile>) => void // 文件上传成功时的钩子
  onError?: (err:Error, file: RcFile, files:Array<UploadFile>) => void // 文件上传失败时的钩子
  onProgress?: (event: { percent: number }, file: RcFile, files:Array<UploadFile>) => void // 文件上传时的钩子
  onChange?: (file: RcFile, files:Array<UploadFile>) => void // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
  beforeUpload?: (file:RcFile) => Promise<T> // 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
  beforeRemove?: (file:RcFile, files:Array<UploadFile>) => Promise<T> // 删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止删除。
  listType?: 'text'|'picture'|'picture-card' // 文件列表的类型
  autoUpload?: boolean // 是否在选取文件后立即进行上传
  fileList?: Array<T> // 上传的文件列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]
  httpRequest?: (o:any) => void // 上传实现
  disabled?: boolean // 是否禁用
  limit?: number // 最大允许上传个数
  onExceed?: (files:Array<UploadFile>) => void // 文件超出个数限制时的钩子
  tiggert?: React.ReactNode
  tip?: React.ReactNode
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
    return this.props.listType || 'picture'
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

  getFile(rawFile: RcFile): any {
    let fileList = this.state.uploadFiles;
    let target;
    fileList.every(item => {
      target = rawFile.uid === item.uid ? item : null;
      return !target;
    });
    return target;
  }

  // Event handler
  componentDidMount() {
    // console.log('-----componentDidMount------', this.refs.uploadInner.abort)
  }

  componentDidUpdate() {
  }

  handleProgress = (ev:any, rawFile: RcFile) => {
    if (!!this.props.onProgress && !!this.state.uploadFiles) {
      this.props.onProgress(ev, rawFile, this.state.uploadFiles);
    }
    const file = this.getFile(rawFile);
    if (!file) return
    file.status = 'uploading';
    file.percentage = ev.percent || 0;

    this.setState({
      uploadFiles: [...this.state.uploadFiles]
    });
  }

  handleSuccess = (res:any, rawFile: RcFile) => {
    const file = this.getFile(rawFile);
    delete this.reqs[file.uid];
    const { onSuccess, onChange } = this.props

    const fileList = this.state.uploadFiles;

    if (file) {
      file.status = 'success';
      file.response = res;

      onSuccess && onSuccess(res, file, fileList);
      onChange && onChange(file, fileList);
    }

    this.setState({
      uploadFiles: [...fileList]
    });
  }

  handleError = (err:any, rawFile: RcFile) => {
    const file = this.getFile(rawFile);
    delete this.reqs[file.uid];
    const fileList = this.state.uploadFiles;

    const { onError, onChange } = this.props

    file.status = 'fail';

    fileList.splice(fileList.indexOf(file), 1);

    this.setState({
      uploadFiles: [...fileList]
    })

    onError && onError(err, file, fileList);
    onChange && onChange(file, fileList);
  }

  abort = (file:RcFile) => {
    console.log('-----------abort-----------')
    const {
      reqs
    } = this;
    if (file) {
      if (reqs[file.uid]) {
        // reqs[file.uid].abort();
        delete reqs[file.uid];
      }
    } else {
      Object.keys(reqs).forEach((uid) => {
        if (reqs[uid]) reqs[uid].abort();
        delete reqs[uid];
      });
    }
  }

  handleRemove = (f: RcFile) => {
    let file = this.getFile(f);
    const { onRemove, beforeRemove } = this.props
    let doRemove = () => {
      this.abort(file);
      let fileList = this.state.uploadFiles;
      fileList.splice(fileList.indexOf(file), 1);
      onRemove && onRemove(file, fileList);
      this.setState({
        uploadFiles: [...fileList]
      });
    };

    if (!beforeRemove) {
      doRemove();
    } else if (typeof beforeRemove === 'function') {
      const before:any = beforeRemove && beforeRemove(file, this.state.uploadFiles);
      if (before && before.then) {
        before.then(() => {
          doRemove();
        });
      } else if (before !== false) {
        doRemove();
      }
    }
  }



  handleStart = (rawFile: RcFile) => {
    rawFile.uid = Date.now() + '';
    
    let file:IObj = {
      status: 'ready',
      name: rawFile.name,
      size: rawFile.size,
      percentage: 0,
      uid: rawFile.uid,
      raw: rawFile
    };

    this.reqs[rawFile.uid] = rawFile
    
    if (this.listType === 'picture-card' || this.listType === 'picture') {
      try {
        file.url = URL.createObjectURL(rawFile);
      } catch (err) {
        console.error('[Element Error][Upload]', err);
        return;
      }
    }

    this.setState({
      uploadFiles: [...this.state.uploadFiles, file]
    });
  }

  render() {
    const { tiggert, tip, action } = this.props
    const { fileList, handleProgress, handleStart, handleRemove } = this
    const flies = [...this.state.uploadFiles]
    return (
      <div>
        <UploadInput 
          ref='uploadInner'
          action={action}
          tiggert={tiggert}
          onStart= { handleStart }
          onProgress={ handleProgress }
        ></UploadInput>
        {tip}
        <UploadList onRemove={ handleRemove } files={flies}></UploadList>
      </div>
    )
  }
}

export default Upload