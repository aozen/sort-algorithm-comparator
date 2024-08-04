const fs = require('fs')

// Generate random data
const generateRandomData = (size) => {
  const randomData = []
  for (let i = 0; i < size; i++) {
    randomData.push(randomNumber())
  }
  return randomData
}

// Generate ordered data
function generateOrderedData(size) {
  const orderedData = []
  for (let i = 0; i < size; i++) {
    orderedData.push(randomNumber())
  }
  orderedData.sort((a, b) => a - b)
  return orderedData
}

// Generate mostlyOrdered data
const generateMostlyOrderedData = (size) => {
  const mostlyOrderedData = []
  for (let i = 0; i < size; i++) {
    mostlyOrderedData.push(randomNumber())
  }
  mostlyOrderedData.sort((a, b) => a - b)
  for (let i = 0; i < size * 0.05; i++) {
    const randomIndex = Math.floor(Math.random() * size)
    mostlyOrderedData[randomIndex] = randomNumber()
  }
  return mostlyOrderedData
}

const randomNumber = () => {
  return parseFloat((Math.random() * 10000).toFixed(4))
}

// Generate datasets
const datasets = {
  ordered: [],
  mostlyOrdered: [],
  random: []
}

const datasetSizes = [100000]
// const datasetSizes = [100, 1000, 5000, 10000, 50000]//, 100000]

datasetSizes.forEach((size) => {
  datasets.ordered.push(generateOrderedData(size))
  datasets.mostlyOrdered.push(generateMostlyOrderedData(size))
  datasets.random.push(generateRandomData(size))
})

// Write to JSON file
fs.writeFileSync('data.json', JSON.stringify(datasets, null, 2))

console.log('Data generated successfully.')
