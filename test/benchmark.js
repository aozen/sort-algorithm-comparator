const fs = require('fs')
const { performance } = require('perf_hooks')

// Load sorting algorithms
const timsort = require('../algorithms/timsort')
const quicksort = require('../algorithms/quicksort')
const mergesort = require('../algorithms/mergesort')
const heapsort = require('../algorithms/heapsort')
const shellsort = require('../algorithms/shellsort')
const pdqsort = require('../algorithms/pdqsort')
const jsDefaultSort = require('../algorithms/jsDefaultSort')
// const insertionsort = require('../algorithms/insertionsort')
// const bubblesort = require('../algorithms/bubblesort')
// const selectionsort = require('../algorithms/selectionsort')

// List of sorting algorithms to test
const algorithms = [
  { name: 'Quicksort', func: quicksort },
  { name: 'Timsort', func: timsort },
  { name: 'Mergesort', func: mergesort },
  { name: 'Heapsort', func: heapsort },
  { name: 'Shellsort', func: shellsort },
  { name: 'Pdqsort', func: pdqsort },
  { name: 'jsDefaultSort', func: jsDefaultSort },
  // { name: 'Insertionsort', func: insertionsort }, // Uncomment to test O(n^2) algorithms if you have enough patient on big data
  // { name: 'Bubblesort', func: bubblesort }, // Uncomment to test O(n^2) algorithms if you have enough patient on big data
  // { name: 'Selectionsort', func: selectionsort }, // Uncomment to test O(n^2) algorithms if you have enough patient on big data
]

// Read data from file
const dataset = JSON.parse(fs.readFileSync('data.json', 'utf8'))

const repetitions = 20 // Number of repetitions for each test

// Function to measure the execution time of a sorting algorithm
const measureExecutionTime = (sortFunction, array) => {
  const actualResult = jsDefaultSort(array)
  const startTime = performance.now()
  const result = sortFunction([...array]) // Make a copy of the array to avoid side effects
  const endTime = performance.now()
  if(!compareArrays(result, actualResult)) {
    console.log('err:', sortFunction)
  }
  return endTime - startTime
}

// Function to perform the performance test
const performPerformanceTest = (data) => {
  const overallStats = {}

  // Initialize overallStats dynamically based on algorithms array
  algorithms.forEach(algorithm => {
    overallStats[algorithm.name] = { wins: 0 }
  })

  const datasetTypes = Object.keys(data) // ['ordered', 'mostlyOrdered', 'random']
  const dataLength = data['ordered'].length // same for mostlyOrdered & random

  // Loop through each dataset length
  for (let i = 0; i < dataLength; i++) {
    const groupDataLength = Object.values(data)[0][i].length
    console.log(`\nPerformance test for Dataset ${i + 1} (${groupDataLength} elements):`)

    // Loop through each dataset type (ordered, mostlyOrdered, random) for the current length
    datasetTypes.forEach(datasetType => {
      const currentDataset = data[datasetType][i]
      console.log(`\nPerformance test for ${datasetType}`)

      const results = {}

      // Loop through each algorithm to test
      algorithms.forEach(algorithm => {
        let totalTime = 0

        // Repeat the test multiple times to get an average execution time
        for (let r = 0; r < repetitions; r++) {
          totalTime += measureExecutionTime(algorithm.func, currentDataset)
        }

        // Calculate and store the average execution time
        const averageTime = totalTime / repetitions
        results[algorithm.name] = parseFloat(averageTime.toFixed(2))
      })

      // Determine the winner for this dataset
      const winner = Object.keys(results)
        .reduce((prev, curr) => results[prev] < results[curr] ? prev : curr, 0)

      // Display results for this dataset
      const sortedResults = Object.entries(results)
        .sort(([, a], [, b]) => a - b)
      console.table(sortedResults.reduce((obj, [key, val]) => {
        obj[key] = val.toString()
        return obj
      }, {}))

      // Increment overallStats for the winner of this dataset
      overallStats[winner].wins++
    })

    // Add separator line between different lengths
    console.log('===============================================================')
  }

  // Display overall summary after all datasets are processed
  console.log('\nOverall Summary:')
  Object.keys(overallStats).forEach(algorithm => {
    console.log(`${algorithm} total wins: ${overallStats[algorithm].wins}`)
  })
}

const compareArrays = (a, b) => {
  return JSON.stringify(a) === JSON.stringify(b)
}

// Perform the performance test
performPerformanceTest(dataset)
