const merge = (left, right) => {
  const result = []
  let leftIndex = 0
  let rightIndex = 0

  // Compare elements from left and right arrays and add the smaller one to the result
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex])
      leftIndex++
    } else {
      result.push(right[rightIndex])
      rightIndex++
    }
  }

  // Add remaining elements from left array
  while (leftIndex < left.length) {
    result.push(left[leftIndex])
    leftIndex++
  }

  // Add remaining elements from right array
  while (rightIndex < right.length) {
    result.push(right[rightIndex])
    rightIndex++
  }

  return result
}

const mergesort = arr => {
  if (arr.length <= 1) {
    return arr // Base case: array with 0 or 1 element is already sorted
  }

  const middle = Math.floor(arr.length / 2)
  const left = arr.slice(0, middle) // Divide the array into two part
  const right = arr.slice(middle)

  // Recursively sort the left and right parts and merge them
  return merge(mergesort(left), mergesort(right))
}

module.exports = mergesort
