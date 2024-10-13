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
  let currentValue = randomNumber() * 10
  for (let i = 0; i < size; i++) {
    currentValue += Math.random() * 10
    orderedData.push(currentValue)
  }
  return orderedData
}

// Generate mostly ordered data
const generateMostlyOrderedData = (size) => {
  const mostlyOrderedData = generateOrderedData(size)
  for (let i = 0; i < size / 10; i++) {
    const idx1 = Math.floor(Math.random() * size)
    const idx2 = Math.floor(Math.random() * size)
    ;[mostlyOrderedData[idx1], mostlyOrderedData[idx2]] = [mostlyOrderedData[idx2], mostlyOrderedData[idx1]]
  }
  return mostlyOrderedData
}

const randomNumber = () => {
  return parseFloat((Math.random() * 10000).toFixed(4))
}

// Generate datasets
const generateDatasets = (sizes) => {
  const datasets = {}
  sizes.forEach(size => {
    datasets[`random_${size}`] = generateRandomData(size)
    datasets[`ordered_${size}`] = generateOrderedData(size)
    datasets[`mostlyOrdered_${size}`] = generateMostlyOrderedData(size)
  })
  return datasets
}

const datasetSizes = [100, 1000, 5000, 10000, 50000, 100000]
const datasets = generateDatasets(datasetSizes)

fs.writeFileSync('data.json', JSON.stringify(datasets, null, 2), 'utf-8')

console.log('Data generated successfully.')