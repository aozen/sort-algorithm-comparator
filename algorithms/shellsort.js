const shellsort = arr => {
  const n = arr.length
  let gap = Math.floor(n / 2)

  while (gap > 0) {
    for (let i = gap; i < n; i++) {
      const temp = arr[i]
      let j = i

      // Move elements to the right to find the right place for arr[i]
      while (j >= gap && arr[j - gap] > temp) {
        arr[j] = arr[j - gap]
        j -= gap
      }

      // Place the current element in the right spot
      arr[j] = temp
    }

    // Make the gap smaller for the next pass
    gap = Math.floor(gap / 2)
  }

  return arr
}

module.exports = shellsort
