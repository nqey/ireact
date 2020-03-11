import React, { useState } from 'react'
import { CSSTransition } from 'src/basic/Transition/index'

interface IP {
  title: React.ReactNode|string
  content: React.ReactNode|string
}

const CollapseItem:React.FC<IP> = props => {
  const {
  	title,
    content
  } = props
  const [inProp, setInProp] = useState(false);

  let key:number = Number(Math.random().toFixed(3)) * 1000;
  return (
    <div className="sy-collapse-item">
      <div
        className="sy-collapse-item__header"
      >
        { title }
        <i className="sy-collapse-item__arrow sy-icon-arrow-right" onClick={() => setInProp(true)}></i>
      </div>
      <CSSTransition in={inProp} classNames="sy-collaps" timeout={2000}>
        <div
          className="sy-collapse-item__wrap"
          key={key}
        >
          <div className="sy-collapse-item__content">
            { content }
          </div>
        </div>
      </CSSTransition>
    </div>
  )
}

export default CollapseItem
