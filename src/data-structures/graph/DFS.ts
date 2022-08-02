import { GraphNode } from "./Graph";

const visit = (node: GraphNode) => {
  console.log("VISITED NODE", node.name);
};

function DFS(node: GraphNode, cb: (node: GraphNode) => void): void {
  if (node === null) return;

  cb(node);
  node.marked = true;
  if (node.adjacents) {
    for (let n of node.adjacents) {
      if (!n.marked) {
        DFS(n, cb);
      }
    }
  }
}

const A: GraphNode = { name: "A", adjacents: undefined };
const B: GraphNode = { name: "B", adjacents: undefined };
const C: GraphNode = { name: "C", adjacents: undefined };
const D: GraphNode = { name: "D", adjacents: undefined };
const E: GraphNode = { name: "E", adjacents: undefined };
const F: GraphNode = { name: "F", adjacents: undefined };

A.adjacents = [B, C];
B.adjacents = [D];
C.adjacents = [E];
D.adjacents = [F];
E.adjacents = [F];

DFS(A, visit);
