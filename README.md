# Object.defineProperty vs Proxy

在线测试地址：[]()

# 创建响应式，`Proxy` 性能更好

|                | 运行 100 次 | 运行 1000 次 | 运行 10000 次 | 运行 100000 次 |
| -------------- | ----------- | ------------ | ------------- | -------------- |
| Proxy          | 0.10 ms     | 0.30 ms      | 0.50 ms       | 5.00 ms        |
| defineProperty | 0.30 ms     | 1.20 ms      | 12.00 ms      | 145.50 ms      |

# 对响应式对象的读写性能，`Object.defineProperty` 性能更好

|                | 运行 100 次 | 运行 1000 次 | 运行 10000 次 | 运行 100000 次 |
| -------------- | ----------- | ------------ | ------------- | -------------- |
| Proxy          | 0.10 ms     | 0.80 ms      | 4.40 ms       | 28.40 ms       |
| defineProperty | 0.00 ms     | 0.40 ms      | 1.80 ms       | 18.0 ms        |

# 深度监听，二者差不多

|                | 运行 100 次 | 运行 1000 次 | 运行 10000 次 | 运行 100000 次 |
| -------------- | ----------- | ------------ | ------------- | -------------- |
| Proxy          | 0.00 ms     | 0.30 ms      | 3.40 ms       | 32.40 ms       |
| defineProperty | 0.00 ms     | 0.40 ms      | 2.80 ms       | 30.90 ms       |

> 参考 [https://github.com/y-temp4/object-defineproperty-vs-proxy.git/](https://github.com/y-temp4/object-defineproperty-vs-proxy.git/)
