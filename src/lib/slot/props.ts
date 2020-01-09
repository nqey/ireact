import React from 'react'

const set = (childrens: any,  callback:(c:any, i:number) => {}) => {
  return React.Children.map(childrens, (child:any, index: number) => {
    let childParams = callback(child, index)
    return React.cloneElement(child, {
      params: Object.assign({index}, childParams)
    });
  })
}

export default {
  set
}