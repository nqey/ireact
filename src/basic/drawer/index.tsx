import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import classnames from 'src/lib/utils/classnames'
import { CSSTransition } from 'src/basic/Transition/index'

interface IP {
  title?: React.ReactNode|string
  content?: React.ReactNode|string
  ins:boolean
  timeout?:number
  setIns?:any
  appendToBody?:boolean
  modal?:boolean
  zIndex?:number
  direction?: 'rtl'| 'ltr'|'ttb'|'btt',
  size?: 'full',
  name?:string
  onCtr?: (set:any) => void // 控制器
}

const method = {
  appendToBody: (drawerDom:any) => {
    const id = 'ireact-drawer__wrapper';
    let div = document.createElement('div');
    div.setAttribute('id', id);
    document.body.append(div);
    ReactDOM.render(drawerDom, document.getElementById(id));
  },
  delModal: (name:string) => {
    const dom = document.getElementById('ireact-modal-' + name);
    if (dom) document.body.removeChild(dom);
  },
  addModal: (setIns:any, zIndex:number, name:string) => {
    let div = document.createElement('div');
    div.setAttribute('id', 'ireact-modal-' + name);
    div.setAttribute('class', 'v-modal');
    div.setAttribute('style', 'z-index:'+zIndex);
    div.setAttribute('tabindex', '0');
    div.onclick = _ => {
      method.delModal(name);
      setIns && setIns(false);
    }
    document.body.append(div);
  },
  toggle: (ins:boolean) => {
    const obj:any = {}
    obj['sy-drawer__container'] = true
    obj['sy-drawer__open'] = ins
    return classnames(obj);
  }
}

const Drawer:React.FC<IP> = props => {
  const {
    ins,
    timeout = 1000,
    appendToBody = false,
    modal = true,
    title,
    content,
    zIndex = 2029,
    direction = 'btt',
    size = '',
    name = 'base',
    onCtr
  } = props

  const [inProp, setInProp] = useState<boolean>(ins);

  const ctr = {
    open: () => setInProp(true),
    close: () => setInProp(false)
  };

  useEffect(() => {
    onCtr && onCtr(ctr);
    // 添加挡板
    if (modal && inProp && !size) method.addModal(setInProp, zIndex, name);
    console.log('render modal', name);
    return function cleanUp() {
      method.delModal(name);
      console.log('delete modal');
    }
  })

  const headerDom = (
    <header className="sy-drawer__header">
      {title}
    </header>
  )

  const closeDome = (
    <button
      className="sy-drawer__close-btn"
      type="button"
      style={{
        padding: '5%'
      }}
      onClick={() => ctr.close()}>
      <i className="sy-icon sy-icon-right" style={{
        fontSize: '30px'
      }}></i>
    </button>
  )

  // 模版
  const drawerDom = (
    <CSSTransition in={inProp} classNames="sy-drawer-fade" timeout={300}>
      <div
        className={`sy-drawer__wrapper ${direction} ${size}`} style={{
          zIndex: zIndex + 10,
        }}>
        <div
          className={method.toggle(inProp)}>
          <div
            className={`sy-drawer ${direction} ${size}`}
            >
            {title && headerDom}
            <section className="sy-drawer__body">
              {content}
            </section>
            {size && closeDome}
          </div>
        </div>
      </div>
    </CSSTransition>
  );
  // 注入body
  if (appendToBody) {
    method.appendToBody(drawerDom);
    return null;
  }
  return drawerDom
}

export default Drawer
