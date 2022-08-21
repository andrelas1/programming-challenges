// given a list of bus routes, find the minimum amount of exchanges necessary to go from point X to point Y
// [['A', 'B', 'C'], ['D', 'C'], ['B, 'D'], ['E', 'F'], ['C', 'E']]
// each index represents a bus
// so this list can be mapped to a hash table
// A: 0
// B: 0, 2
// C: 0, 1, 4
// D: 1, 2
// E: 3, 4
// F: 3

// and then this is sort of like a BFS, where we need to use a queue to find the exchanges from
// A -> E
// So the queue will have every stop that can be reachable from A, and then for every stop, we try to find all the other stops that
// can be reachable from those stops, until we find E
// There is a trick with using two queues, one for the current path we are looking at and when we go through every path, if we don't find it
// we will use this other queue, which serves like a "second leve search"
