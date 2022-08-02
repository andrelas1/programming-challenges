function merge(intervals: number[][]): number[][] {
  if (intervals.length === 1) {
    return intervals;
  }

  const sorted = [...intervals];
  sorted.sort((a, b) => {
    if (a[0] < b[0]) return -1;
    if (a[0] > b[0]) return 1;
    return 0;
  });

  const result = [];

  const checkIfInInterval = (
    a1: [number, number],
    a2: [number, number]
  ): boolean => {
    let [_, e] = a1;
    let [__, end] = a2;

    const smaller = e < end ? a1 : a2;
    const higher = e > end ? a1 : a2;

    return smaller[1] >= higher[0];
  };

  const getMergedInterval = (
    a1: [number, number],
    a2: [number, number]
  ): [number, number] => {
    const [s, e] = a1;
    const [start, end] = a2;

    const mergedS = s < start ? s : start;
    const mergedE = e > end ? e : end;
    return [mergedS, mergedE];
  };

  result.push(sorted[0]);

  for (let i = 1; i < sorted.length; i++) {
    const [s, e] = result.pop() as [number, number];
    const [start, end] = sorted[i];
    if (checkIfInInterval([s, e], [start, end])) {
      result.push(getMergedInterval([s, e], [start, end]));
    } else {
      result.push([s, e], [start, end]);
    }
  }

  return result;
}
