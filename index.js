import { performance } from 'perf_hooks'

import fs from 'fs'
import os from 'os'
import path from 'path'

// Load sorting algorithms
import timsort from'./algorithms/timsort.js'
import quicksort from'./algorithms/quicksort.js'
import mergesort from'./algorithms/mergesort.js'
import heapsort from'./algorithms/heapsort.js'
import shellsort from'./algorithms/shellsort.js'
import pdqsort from'./algorithms/pdqsort.js'
// import insertionsort from'./algorithms/insertionsort.js'
// import bubblesort from'./algorithms/bubblesort.js'
// import selectionsort from'./algorithms/selectionsort.js'

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
  const nonOrderedArray = [...this]

  // Clear logs array just in case
  logs.length = 0

  // Measure default sort time
  const originalSortStart = performance.now()
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
  if(logs.length > 0) {
    const defaultSortingLog = {
      method: 'Your Sorting Algorithm',
      time: originalSortTime
    }

    logTimes(defaultSortingLog, logs, stackInfo)
  }

  return originalResult
}

// Compare two array for equality, return if they are equal
// Otherwise return false, sorting cmoparison is meaningless
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
  const logDirectory = path.join(homeDirectory, '.js-sorting-logs')
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
  try {
    fs.appendFileSync(
      logFilePath, JSON.stringify(logEntry, undefined, 2) + '\n'
    )
  } catch (error) {
    console.error('Error writing to log file:', error)
  }
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
// Only god knows why this is so complicated
const getStackInfo = () => {
  const stack = new Error().stack.split('\n')
  // Skip first three lines to get to the users call
  // Example caller: "    at testFunction (file:///home/user/ProjectFolder/myFile.js:8:21)"
  const caller = stack[3] || 'Unknown caller'

  // functionMatch[0] = full match
  // functionMatch[1] = functionName
  // functionMatch[2] = filePath
  // functionMatch[3] = lineNumber
  // functionMatch[4] = columnNumber
  const functionMatch = /at (.+?) \((.+?):(\d+):(\d+)\)/.exec(caller)

  // directMatch[0] = full match
  // directMatch[1] = filePath
  // directMatch[2] = lineNumber
  // directMatch[3] = columnNumber
  const directMatch = /at (.+?):(\d+):(\d+)/.exec(caller)

  if (functionMatch) {
    return {
      functionName: functionMatch[1].trim(),
      fileName: functionMatch[2],
      lineNumber: functionMatch[3]
    }
  } else if (directMatch) {
    return {
      functionName: 'Global scope',
      fileName: directMatch[1],
      lineNumber: directMatch[2]
    }
  }
  return {
    functionName: 'Unknown function',
    fileName: 'Unknown file',
    lineNumber: 'Unknown line'
  }
}

export default {}
