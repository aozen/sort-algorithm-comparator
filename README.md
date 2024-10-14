# Sort Algorithm Comparator

This project provides two main features to help developers evaluate and benchmark sorting algorithms in JavaScript.

## Feature 1: Enhanced Array Sorting

Once the project is integrated into your environment, it modifies the behavior of the native `Array.prototype.sort()` method. Instead of using the default sorting algorithm, your arrays will be sorted using various algorithms. The time taken for each algorithm will be logged into `~/.js-sorting-logs/times.log`, allowing you to track the performance and determine the most efficient algorithm for your use case.

## Feature 2: Benchmarking Sorting Algorithms

You can also benchmark multiple algorithms using either predefined or randomly generated datasets.

### Data Structure

The data for benchmarking is stored in `data.json`. Each array object contains two arrays (e.g., `firstArray` and `secondArray`). The arrays are compared pairwise, where the first element of `firstArray` is compared with the first element of `secondArray`, and so on. Both arrays must have the same length, and each object requires a key.

Example:

```json
{
  "firstArray": [
    [1, 2, 3],
    [4, 5, 6]
  ],
  "secondArray": [
    [1, 3, 2],
    [6, 5, 4]
  ]
}

```

### Generating Test Data

To generate random datasets for testing, use:

```bash
npm run generateData
```

This will populate `data.json` with `ordered`, `mostly ordered`, and `random` datasets, preparing your project for benchmarking.

### Running Benchmarks

Once the data is ready, run:

```bash
npm run benchmark
```

This will compare multiple sorting algorithms, running each algorithm 20 times (by default) on every array. The benchmark calculates the average execution time and displays the results in the terminal.

### TODO List

[ ] Add repeat into cli parameters `--repeat=20`
[ ] Add data into cli parameters `--data=path/to/customData.json`
[ ] Select algorithms to run `--allow=quicksort,timsort`
[ ] Select algorithms to disable `--disable=quicksort,timsort`
[ ] Filter max best case complexity `--bc=on2`
[ ] Filter max worst case complexity `--wc=logn`
[ ] Filter max average case complexity `--ac=on`
[ ] Select output file type `--output=json`
[ ] Add memory usages into log `--with-memory`
[ ] Filter minimum array length `--minLength=100`
[ ] Filter maximum array length `--minLength=10000`
[ ] Allow adjusting the log file location `--log=path/to/logs`
[ ] Add visual graphs for benchmarking results
