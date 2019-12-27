export interface RcFile extends File {
  uid: string;
  readonly lastModifiedDate: Date;
  readonly webkitRelativePath: string;
  [propName: string]: any
}

export interface UploadFile<T = any> {
  uid: string;
  size: number;
  name: string;
  fileName?: string;
  lastModified?: number;
  lastModifiedDate?: Date;
  percentage?: number;
  raw?: RcFile;
  url?: string;
  status?: 'error' | 'success' | 'done' | 'uploading' | 'removed' | 'ready';
  percent?: number;
  thumbUrl?: string;
  originFileObj?: File | Blob;
  response?: T;
  error?: any;
  linkProps?: any;
  type: string;
  xhr?: T;
  preview?: string;
}

export interface IObj{
  [key: string]: any
}
