
/**
 * @param { Function } reducer
 * @return { Object }
 */

export function createStore (reducer) {
  let state = null
  const listeners = []
  const getState = () => state
  // 数据修改后的回调
  const subScribe = (listener) => { listeners.push(listener) }
  const dispatch = (action) => {
    // reducer需要返回值，闭包保存值
    state = reducer(state, action)
    // 执行回调
    listeners.forEach(e => e())
  }
  // 初始化state
  dispatch({})
  return { getState, subScribe, dispatch }
}

const arr = [1, 2, 3, 4, 5]

const reducer = function (state = arr, action) {
  const { type } = action
  switch (type) {
    case pop:
      return state.slice(0, state.length - 2)
    case push:
      return state.splice(state.length - 1, 0, action.data)
  }
}

