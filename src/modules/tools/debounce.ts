/**
 * @description: 防抖函数
 * @param {() => void} func 要防抖的函数，内部函数
 * @param {number} wait 等待时间
 * @param {number} [maxWait] 最大时限，有的话是节流函数，没有的话是防抖函数
 * @param {boolean} [leading] 规定在延迟开始前是否调用内部函数，默认不调用
 * @return {any} 已经防抖的函数
 */
function debounce(func: any, wait: number, maxWait = 0, leading = false): any {
  let lastArgs: unknown, // 保存参数
    lastThis: unknown, // 保存this
    timerId: number | undefined, // 定时器id
    lastCallTime: number | undefined, // 最近调用防抖函数的时间
    lastInvokeTime: number | undefined // 最近调用内部函数的时间，0初值确保
  const maxing = !!maxWait // 是否指定了最大等待时间

  // 最大时限不应该小于等待时间
  if (maxWait) {
    maxWait = Math.max(wait, maxWait)
  }

  // 重置定时器
  function startTimer(pendingFunc: () => void) {
    cancelAnimationFrame(<number>timerId)
    return requestAnimationFrame(pendingFunc)
  }

  // 检测是否到了该执行的时间
  function shouldInvoke(time: number) {
    const timeSinceLastCall = time - <number>lastCallTime
    const timeSinceLastInvoke = time - <number>lastInvokeTime

    // 上次内部函数时间尚未定义 (首次执行节流函数)
    // 距离上一次防抖函数的调用已超过等待时间 (防抖函数的功能)
    // 设置了最大时限，且距离上次内部函数的调用已达到最大时限 (节流函数的功能)
    return lastInvokeTime === undefined || timeSinceLastCall >= wait || (maxing && timeSinceLastInvoke >= maxWait)
  }

  // 调用内部函数
  function invokeFunc(time: number) {
    // 获取之前保存的this与参数
    const args = lastArgs
    const thisArg = lastThis
    // this与参数置空，不影响垃圾回收
    lastArgs = lastThis = undefined
    // 更新最近内部函数的调用时间
    lastInvokeTime = time

    func.apply(thisArg, <[]>args)
  }

  // 不断获取当前时间判断是否应该调用内部函数
  function timerExpired() {
    const time = Date.now()
    if (shouldInvoke(time)) {
      timerId = undefined
      // 如果已经立刻执行内部函数
      // 且等待时间内没有再次调用节流函数的话
      // 就不需要在等待时间过后再次执行内部函数了
      if (lastArgs) invokeFunc(time)
    } else {
      // 重新开启定时器
      timerId = startTimer(timerExpired)
    }
  }

  // 返回的防抖函数，该函数无返回值
  function debounced(this: object, ...args: unknown[]) {
    const time = Date.now()
    // 这里检测是否应该重置定时器
    const isInvoking = shouldInvoke(time)
    // 更新this与参数
    lastArgs = args
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    lastThis = this
    // 更新防抖函数调用的时间
    lastCallTime = time

    if (isInvoking) {
      if (timerId === undefined) {
        // 首次执行节流函数，更新内部函数调用时间
        lastInvokeTime = time
        timerId = startTimer(timerExpired)
        // 检测leading属性，立即调用内部函数
        if (leading) invokeFunc(time)
      } else if (maxing) {
        // 节流功能，执行内部函数并重置定时器
        timerId = startTimer(timerExpired)
        invokeFunc(time)
      }
    } else if (timerId === undefined) {
      // 内部函数刚执行完又调用了节流函数
      // 只开启定时器，无需更新内部函数调用时间
      timerId = startTimer(timerExpired)
    }
  }

  debounced.cancel = function () {
    // 清除定时器
    if (timerId !== undefined) {
      cancelAnimationFrame(timerId)
    }
    // 恢复内部参数
    lastArgs = lastThis = timerId = lastCallTime = lastInvokeTime = undefined
  }

  return debounced
}

export default debounce
