const quicksort = arr => {
  if (arr.length <= 1) {
    return arr
  }

  const pivot = arr[Math.floor(arr.length / 2)]
  const left = []
  const right = []
  const equal = []

  for (const num of arr) {
    if (num < pivot) {
      left.push(num)
    } else if (num > pivot) {
      right.push(num)
    } else {
      equal.push(num)
    }
  }

  return quicksort(left).concat(equal).concat(quicksort(right))
}

export default quicksort
