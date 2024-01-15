/** Object.defineProperty 深度监听 */
export function deepDefObserve(obj, week) {
  const keys = Object.keys(obj)
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    let value = obj[key]

    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: true,
      get() {
        if (
          typeof value === "object" &&
          value !== null &&
          week &&
          !week.has(value)
        ) {
          week.set(value, true)
          deepDefObserve(value)
        }
        return value
      },
      set(newValue) {
        value = newValue
      },
    })
  }
  return obj
}

/** Proxy 深度监听 */
export function deepProxy(obj, proxyWeek) {
  const myProxy = new Proxy(obj, {
    get(target, property) {
      let res = Reflect.get(target, property)
      if (
        typeof res === "object" &&
        res !== null &&
        proxyWeek &&
        !proxyWeek.has(res)
      ) {
        proxyWeek.set(res, true)
        return deepProxy(res)
      }
      return res
    },
    set(target, property, value) {
      return Reflect.set(target, property, value)
    },
  })
  return myProxy
}
