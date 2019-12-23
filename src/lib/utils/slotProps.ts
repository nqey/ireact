import React from 'react'

const setSlotProps = (childrens: any, params: any) => {
  return React.Children.map(childrens, (child:any) => {
    return React.cloneElement(child, {
      params
    });
  })
}

export default setSlotProps