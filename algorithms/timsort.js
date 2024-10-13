const timsort = arr => {
  const MIN_MERGE = 32

  function insertionSort(arr, left, right) {
    for (let i = left + 1; i <= right; i++) {
      const temp = arr[i]
      let j = i - 1
      while (j >= left && arr[j] > temp) {
        arr[j + 1] = arr[j]
        j--
      }
      arr[j + 1] = temp
    }
  }

  function merge(arr, l, m, r) {
    const len1 = m - l + 1
    const len2 = r - m
    const left = new Array(len1)
    const right = new Array(len2)

    for (let i = 0; i < len1; i++) {
      left[i] = arr[l + i]
    }
    for (let j = 0; j < len2; j++) {
      right[j] = arr[m + 1 + j]
    }

    let i = 0, j = 0, k = l
    while (i < len1 && j < len2) {
      if (left[i] <= right[j]) {
        arr[k] = left[i]
        i++
      } else {
        arr[k] = right[j]
        j++
      }
      k++
    }

    while (i < len1) {
      arr[k] = left[i]
      i++
      k++
    }

    while (j < len2) {
      arr[k] = right[j]
      j++
      k++
    }
  }

  const n = arr.length
  for (let i = 0; i < n; i += MIN_MERGE) {
    insertionSort(arr, i, Math.min(i + MIN_MERGE - 1, n - 1))
  }

  for (let size = MIN_MERGE; size < n; size *= 2) {
    for (let left = 0; left < n; left += 2 * size) {
      const mid = left + size - 1
      const right = Math.min(left + 2 * size - 1, n - 1)
      if (mid < right) {
        merge(arr, left, mid, right)
      }
    }
  }

  return arr
}

export default timsort
