// index.js
const { performance } = require('perf_hooks')

const fs = require('fs')
const os = require('os')
const path = require('path')

// Load sorting algorithms
const timsort = require('./algorithms/timsort')
const quicksort = require('./algorithms/quicksort')
const mergesort = require('./algorithms/mergesort')
const heapsort = require('./algorithms/heapsort')
const shellsort = require('./algorithms/shellsort')
const pdqsort = require('./algorithms/pdqsort')
// const insertionsort = require('./algorithms/insertionsort')
// const bubblesort = require('./algorithms/bubblesort')
// const selectionsort = require('./algorithms/selectionsort')

// List of sorting algorithms to test
const algorithms = [
  { name: 'Quicksort', func: quicksort },
  { name: 'Timsort', func: timsort },
  { name: 'Mergesort', func: mergesort },
  { name: 'Heapsort', func: heapsort },
  { name: 'Shellsort', func: shellsort },
  { name: 'Pdqsort', func: pdqsort },
  // { name: 'Insertionsort', func: insertionsort }, // Uncomment to test O(n^2) algorithms if you have enough patient on big data
  // { name: 'Bubblesort', func: bubblesort }, // Uncomment to test O(n^2) algorithms if you have enough patient on big data
  // { name: 'Selectionsort', func: selectionsort }, // Uncomment to test O(n^2) algorithms if you have enough patient on big data
]

const logs = []

// Store the original sort function
const originalSort = Array.prototype.sort

// Overriding Array.prototype.sort
Array.prototype.sort = function (...args) {
  const stackInfo = getStackInfo()
  const nonOrderedArray = [...this][0]

  // Measure default sort time
  const originalSortStart = performance.now()
  // const originalResult = originalSort.apply([...this], args)
  const originalResult = originalSort.apply([...nonOrderedArray], args)
  const originalSortEnd = performance.now()
  const originalSortTime = originalSortEnd - originalSortStart

  algorithms.forEach(algorithm => {
    const start = performance.now()
    const algoResult = algorithm.func([...nonOrderedArray])
    const end = performance.now()
    if(compare(originalResult, algoResult)) {
      logs.push({ method: algorithm.name, time: end - start })
    }
  })

  // Log the times with additional details
  if(logs) {
    const defaultSortingLog = { method: 'Your Sorting Algorithm', time: originalSortTime }
    logTimes(defaultSortingLog, logs, stackInfo)
  }

  return originalResult
}

// Compare both element if these are not equal, sorting cmoparison is meaningless
const compare = (arr1, arr2) => {
  if (arr1.length !== arr2.length) {
    return false
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false
    }
  }

  return true
}

// Helper function to log times with detailed information
const logTimes = (defaultSortingLog, logs, stackInfo) => {
  const homeDirectory = os.homedir()
  const logDirectory = path.join(homeDirectory, '.betterNodeSorting')
  const logFilePath = path.join(logDirectory, 'times.log')

  if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory, { recursive: true })
  }

  const timestamp = new Date().toISOString()

  const sortedLogs = logs.reduce((acc, log) => {
    insertSorted(acc, log)
    return acc
  }, [])

  const logEntry = {
    timestamp,
    file: `${stackInfo.fileName}:${stackInfo.lineNumber}`,
    function: stackInfo.functionName,
    sortingAlgorithms: [
      {
        algorithm: defaultSortingLog.method,
        time: `${defaultSortingLog.time.toFixed(4)} ms`
      },
      ...sortedLogs
        .filter(({ time }) =>
          Number(defaultSortingLog.time.toFixed(4)) > Number(time.toFixed(4)))
        .map(({ method, time }) => ({
          algorithm: method,
          time: `${time.toFixed(4)} ms`
        }))

    ]
  }

  // Write log entry to the file
  fs.appendFileSync(logFilePath, JSON.stringify(logEntry, undefined, 2) + '\n')
}

const insertSorted = (sortedArr, item) => {
  const time = item.time
  for (let i = 0; i < sortedArr.length; i++) {
    if (time < sortedArr[i].time) {
      sortedArr.splice(i, 0, item)
      return
    }
  }

  sortedArr.push(item)
}

// Function to extract stack trace information
const getStackInfo = () => {
  const stack = new Error().stack.split('\n')
  // We skip the first three lines to get to the user's call
  const caller = stack[3] || 'Unknown caller'
  const match = caller.match(/at (.+?) \((.+?):(\d+):(\d+)\)/) || caller.match(/at (.+?):(\d+):(\d+)/)

  if (match) {
    return {
      functionName: match[1].trim(),
      fileName: match[2],
      lineNumber: match[3]
    }
  }
  return {
    functionName: 'Unknown function',
    fileName: 'Unknown file',
    lineNumber: 'Unknown line'
  }
}

module.exports = {}
