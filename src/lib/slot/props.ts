import React from 'react'

const set = (childrens: any, params: any) => {
  return React.Children.map(childrens, (child:any) => {
    return React.cloneElement(child, {
      params
    });
  })
}

export default {
  set
}