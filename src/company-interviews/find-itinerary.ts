function findItinerary(tickets: string[][]): string[] {
  const flightMap = new Map<string, string[]>();
  const visitBitmap = new Map<string, boolean[]>();
  let flights = 0;
  let result: string[] = [];

  function backtracking(origin: string, route: string[]): boolean {
    if (route.length === flights + 1) {
      result = [...route];
      return true;
    }

    if (!flightMap.has(origin)) {
      return false;
    }

    let i = 0;
    const bitmap = visitBitmap.get(origin) || [];

    const destsFromOrigin = flightMap.get(origin) || [];
    if (destsFromOrigin.length && bitmap.length) {
      for (let dest of destsFromOrigin) {
        if (!bitmap![i]) {
          bitmap[i] = true;
          route.push(dest);
          let ret = backtracking(dest, route);
          route.pop();
          bitmap[i] = false;

          if (ret) {
            return true;
          }
        }
        i++;
      }
    }

    return false;
  }

  // build the graph data structure first using a hash map
  for (let ticket of tickets) {
    const [origin, dest] = ticket;
    if (flightMap.has(origin)) {
      const destList = flightMap.get(origin);
      destList ? destList.push(dest) : null;
    } else {
      const destList = [];
      destList.push(dest);
      flightMap.set(origin, destList);
    }
  }

  // order the destinations and init the visit bitmap
  for (let [key, value] of flightMap.entries()) {
    value.sort();
    const currentVal = visitBitmap.get(key);
    visitBitmap.set(key, currentVal ? currentVal.concat(false) : [false]);
  }

  flights = tickets.length;
  const route = [];
  route.push("JFK");

  // backtracking
  backtracking("JFK", route);

  return result;
}

// tests
// Input: tickets = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]
// Output: ["JFK","MUC","LHR","SFO","SJC"]

// Input: tickets = [["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]
// Output: ["JFK","ATL","JFK","SFO","ATL","SFO"]

// Input: tickets = [["JFK","KUL"],["JFK","LHR"],["SFO","SJC"],["LHR","SFO"]]
// Output: ["JFK","LHR","SFO","SJC","KUL"]

// Input: tickets = [["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]
// Output: ["JFK","ATL","JFK","SFO","ATL","SFO"]
