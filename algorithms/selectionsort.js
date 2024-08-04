const selectionsort = arr => {
  const n = arr.length

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i

    // Find the minimum element in the unsorted part of the array
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }

    // Swap the found minimum element with the first element
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
    }
  }

  return arr
}
module.exports = selectionsort