/*
 * Copyright (c) 2023 Huawei Technologies Co.,Ltd.
 *
 * openInula is licensed under Mulan PSL v2.
 * You can use this software according to the terms and conditions of the Mulan PSL v2.
 * You may obtain a copy of Mulan PSL v2 at:
 *
 *          http://license.coscl.org.cn/MulanPSL2
 *
 * THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND,
 * EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT,
 * MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
 * See the Mulan PSL v2 for more details.
 */

import Inula, { useState } from "openinula"
import "./index.css"
import { buildDataSet, loopCounts } from "./script.js"
import { useEffect } from "openinula"

function getColor(value, compare) {
  if (value === compare) {
    return "black"
  }
  return value > compare ? "red" : "green"
}

function App() {
  const [data, setData] = useState([])

  useEffect(() => {
    buildDataSet((value) => {
      setData((p) => [...p, value])
    })
  }, [])

  return (
    <div>
      <h1>Object.defineProperty vs Proxy</h1>
      {data.map((item) => (
        <div key={item.name}>
          <h2>{item.name}</h2>

          {item.value.map((res, index) => (
            <div key={index}>
              <h3>第 {index + 1} 次测试</h3>
              <table>
                <tr>
                  <td />
                  {loopCounts.map((count) => (
                    <td key={count}>运行 {count} 次</td>
                  ))}
                </tr>

                {res.map((level, levelIndex) => (
                  <tr key={levelIndex}>
                    <td>{levelIndex === 0 ? "Proxy" : "defineProperty"}</td>
                    {level.map((value, valueIndex) => (
                      <td
                        key={valueIndex}
                        style={{
                          color: getColor(
                            value,
                            res[levelIndex === 0 ? 1 : 0][valueIndex]
                          ),
                        }}
                      >
                        {value.toFixed(2)} ms
                      </td>
                    ))}
                  </tr>
                ))}
              </table>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

Inula.render(<App />, document.getElementById("root"))
