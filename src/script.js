import * as example from "./example"

export const loopCounts = [100, 1_000, 10_000, 100_000]

function getPerformanceTime(func, loopCount) {
  const startTime = performance.now()
  for (let i = 0; i < loopCount; i++) {
    func()
  }
  const endTime = performance.now()
  return endTime - startTime
}

export async function buildDataSet(cb) {
  const entries = Object.entries(example)

  function delay() {
    return new Promise((resolve) => {
      setTimeout(resolve, 30)
    })
  }

  for (const [name, value] of entries) {
    let measures = []
    for (let i = 0; i < 3; i++) {
      measures.push([
        loopCounts.map((loopCount) =>
          getPerformanceTime(value.useProxy, loopCount)
        ),
        loopCounts.map((loopCount) =>
          getPerformanceTime(value.useObjectDefineProperty, loopCount)
        ),
      ])
    }
    cb({
      name,
      value: measures,
    })

    await delay()
  }

  console.log("Done")
}
