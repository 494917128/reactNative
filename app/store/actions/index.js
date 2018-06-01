
export const addCount = num => {
  return {
    type: 'ADD_COUNT',
    num
  }
}

export const subtractCount = num => {
  return {
    type: 'SUBTRACT_COUNT',
    num
  }
}

export const currentAnimate = (cls) => ({
    type: 'CURRENT_ANIMATE',
    cls
})