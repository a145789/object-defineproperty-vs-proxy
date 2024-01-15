import { deepDefObserve, deepProxy } from "./observe"

export const _0_calling = {
  useObjectDefineProperty() {
    const data = { a: 1, b: 1, c: 1, d: 1, e: 1 }
    const keys = Object.keys(data)
    for (let i = 0; i < keys.length; i++) {
      Object.defineProperty(data, keys[i], {
        get() {},
        set() {},
      })
    }
  },
  useProxy() {
    const data = { a: 1, b: 1, c: 1, d: 1, e: 1 }
    const proxy = new Proxy(data, {
      get() {},
      set() {},
    })
  },
}

const readDefData = deepDefObserve({ a: 1, b: 1, c: 1, d: 1, e: 1 })
const readProxyData = deepProxy({ a: 1, b: 1, c: 1, d: 1, e: 1 })
export const _1_read = {
  useObjectDefineProperty() {
    readDefData.a
    readDefData.b
    readDefData.e
  },
  useProxy() {
    readProxyData.a
    readProxyData.b
    readProxyData.e
  },
}

const writeDefData = deepDefObserve({ a: 1, b: 1, c: 1, d: 1, e: 1 })
const writeProxyData = deepProxy({ a: 1, b: 1, c: 1, d: 1, e: 1 })
export const _2_write = {
  count: 2,
  useObjectDefineProperty() {
    writeDefData.a = _2_write.count++
    writeDefData.b = _2_write.count++
  },
  useProxy() {
    writeProxyData.a = _2_write.count++
    writeProxyData.b = _2_write.count++
  },
}

const readAndWriteProxyWeek = new WeakMap()
/** 只创建一次测试读写性能 */
export const _3_read_write = {
  count: 2,
  defData: deepDefObserve({ a: 1, b: 1, c: 1, d: 1, e: 1 }),
  useObjectDefineProperty() {
    const data = _3_read_write.defData
    data.a = _3_read_write.count++
    data.b = _3_read_write.count++
    data.a
    data.c
  },
  proxyData: deepProxy({ a: 1, b: 1, c: 1, d: 1, e: 1 }, readAndWriteProxyWeek),
  useProxy() {
    const proxy = _3_read_write.proxyData
    proxy.a = _3_read_write.count++
    proxy.b = _3_read_write.count++
    proxy.a
    proxy.c
  },
}

/** 测试多次创建并读写性能 */
export const _4_create_read_write = {
  count: 2,
  useObjectDefineProperty() {
    const data = { a: 1, b: 1, c: 1, d: 1, e: 1 }
    deepDefObserve(data)
    data.a = _4_create_read_write.count++
    data.b = _4_create_read_write.count++
    data.a
    data.c
  },
  proxyWeek: new WeakMap(),
  useProxy() {
    const data = { a: 1, b: 1, c: 1, d: 1, e: 1 }
    const proxy = deepProxy(data, _4_create_read_write.proxyWeek)
    proxy.a = _4_create_read_write.count++
    proxy.b = _4_create_read_write.count++
    proxy.a
    proxy.c
  },
}

const deepProxyWeek = new WeakMap()
const defWeek = new WeakMap()
export const _5_deep_read_write = {
  count: 2,
  defData: deepDefObserve(
    {
      res: {
        code: 200,
        message: {
          error: null,
        },
        data: [
          {
            id: 1,
            name: "1",
          },
          {
            id: 2,
            name: "2",
          },
        ],
      },
    },
    defWeek
  ),
  useObjectDefineProperty() {
    _5_deep_read_write.defData.res.code = _5_deep_read_write.count++
    _5_deep_read_write.defData.res.data[0].id = _5_deep_read_write.count++
    _5_deep_read_write.defData.res.message.error
    _5_deep_read_write.defData.res.data[0].id
    _5_deep_read_write.defData.res.data[0].name
    _5_deep_read_write.defData.res.data[1].id
    _5_deep_read_write.defData.res.data[1].name
  },
  proxyData: deepProxy(
    {
      res: {
        code: 200,
        message: {
          error: null,
        },
        data: [
          {
            id: 1,
            name: "1",
          },
          {
            id: 2,
            name: "2",
          },
        ],
      },
    },
    deepProxyWeek
  ),
  useProxy() {
    _5_deep_read_write.proxyData.res.code = _5_deep_read_write.count++
    _5_deep_read_write.proxyData.res.data[0].id = _5_deep_read_write.count++
    _5_deep_read_write.proxyData.res.message.error
    _5_deep_read_write.proxyData.res.data[0].id
    _5_deep_read_write.proxyData.res.data[0].name
    _5_deep_read_write.proxyData.res.data[1].id
    _5_deep_read_write.proxyData.res.data[1].name
  },
}
