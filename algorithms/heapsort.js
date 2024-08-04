const heapify = (arr, n, i) => {
  let largest = i // Initialize largest as root
  const left = 2 * i + 1 // Left child
  const right = 2 * i + 2 // Right child

  // If left child is larger than root
  if (left < n && arr[left] > arr[largest]) {
    largest = left
  }

  // If right child is larger than largest so far
  if (right < n && arr[right] > arr[largest]) {
    largest = right
  }

  // If largest is not root
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]]
    heapify(arr, n, largest)
  }
}

const heapsort = arr => {
  const n = arr.length

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i)
  }

  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    // Move current root to end
    [arr[0], arr[i]] = [arr[i], arr[0]]

    heapify(arr, i, 0)
  }

  return arr
}

module.exports = heapsort