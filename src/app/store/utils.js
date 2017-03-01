export const createSignalAction = function (reducerName, base) {
  return ['REQUEST', 'SUCCESS', 'FAILURE'].reduce((prev, curr, index) => {
    prev[curr] = `SIGNAL/${reducerName}/${base}/${curr}`
    prev[curr.toLowerCase()] = createActionCreator(prev[curr])
    return prev
  }, {})
}

export const createDeltaAction = function (reducerName, base) {
  return `DELTA/${reducerName}/${base}`
}

export const createActionCreator = function (action) {
  return (arg) => ({
    type: action,
    data: arg
  })
}
