import React from 'react'
import classnames from 'src/lib/utils/classnames'

interface IP {
  type: 'text'|'textarea' // 类型
  value: 'string'|'number' // 绑定值
  maxlength: number // 原生属性，最大输入长度
  minlength: number // 原生属性，最小输入长度
  showWordLimit: boolean // 是否显示输入字数统计，只在 type = "text" 或 type = "textarea" 时有效
  placeholder: string // 输入框占位文本
  clearable: boolean // 是否可清空
  showPassword: boolean // 是否显示切换密码图标
  disabled: boolean // 禁用
  size: 'medium'|'small'|'mini' // 输入框尺寸，只在 type!="textarea" 时有效
  prefixIcon: string // 输入框头部图标
  suffixIcon: string // 输入框尾部图标
  rows: number // 输入框行数，只对 type="textarea" 有效
  autosize: boolean|object //   自适应内容高度，只对 type="textarea" 有效，可传入对象，如，{ minRows: 2, maxRows: 6 }
  autocomplete: 'on'|'off' // 原生属性，自动补全
  name: string
  readonly: boolean // 是否只读
  max: number
  mix: number
  step: number
  resize: 'none'|'both'|'horizontal'|'vertical' // 控制是否能被用户缩放
  autofocus: boolean // 自动获取焦点
  form: string
  label: string // 输入框关联的label文字
  tabindex: string // 输入框的tabindex
  validateEvent: boolean // 输入时是否触发表单的校验
  prefix: React.ReactNode // 输入框头部内容，只对 type="text" 有效
  suffix: React.ReactNode // 输入框尾部内容，只对 type="text" 有效
  prepend: React.ReactNode // 输入框前置内容，只对 type="text" 有效
  append: React.ReactNode // 输入框后置内容，只对 type="text" 有效
  blur: (event: Event) => void // 在 Input 失去焦点时触发
  focus: (event: Event) => void // 在 Input 失去焦点时触发
  change: (value: string | number) => void // 在 Input 失去焦点时触发
  input: (value: string | number) => void // 在 Input 失去焦点时触发
  clear: (event: Event) => void // 在 Input 失去焦点时触发
}

const Input:React.FC<IP> = (props) => {
  const {
    type = 'text',
    size,
    disabled = false
  } = props

  const inputSize = size
  const inputDisabled = disabled

  const classList = (() => {
    const obj:any = {}
    obj['sy-textarea'] = type === 'textarea'
    obj['sy-input'] = type === 'text'
    obj[`sy-input--${inputSize}`] = true
    obj['is-disabled'] = type === 'text'
    return classnames(obj);
  })()
  

  return (
    <div className={classList}>
    </div>
  )
}

export default Input