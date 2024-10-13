const fs = require('fs')
const path = require('path')

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
  let currentValue = randomNumber() * 10
  for (let i = 0; i < size; i++) {
    currentValue += Math.random() * 10
    orderedData.push(currentValue)
  }
  return orderedData
}

// Generate mostly ordered data
const generateMostlyOrderedData = (size) => {
  const _data = generateOrderedData(size)
  for (let i = 0; i < size / 10; i++) {
    const idx1 = Math.floor(Math.random() * size)
    const idx2 = Math.floor(Math.random() * size)
    ;[_data[idx1], _data[idx2]] = [_data[idx2], _data[idx1]]
  }
  return _data
}

const randomNumber = () => {
  return parseFloat((Math.random() * 10000).toFixed(4))
}

// Generate datasets
const generateDatasets = (sizes) => {
  const datasets = {
    random: [],
    ordered: [],
    mostlyOrdered: []
  }
  sizes.forEach(size => {
    datasets.random.push(generateRandomData(size))
    datasets.ordered.push(generateOrderedData(size))
    datasets.mostlyOrdered.push(generateMostlyOrderedData(size))
  })
  return datasets
}

const datasetSizes = [100, 1000, 5000, 10000, 50000, 100000]
const datasets = generateDatasets(datasetSizes)

// Write datasets to data.json in the root folder
const outputPath = path.join(__dirname, '..', 'data.json')
fs.writeFileSync(outputPath, JSON.stringify(datasets, null, 2), 'utf-8')

console.log('Data generated successfully.')