import { Queue } from "../queue/queue";
import { GraphNode } from "./Graph";

function visit(node: GraphNode) {
  console.log("IT WAS VISITED", node);
}

function BFS(node: GraphNode, cb: (el: GraphNode) => void): void {
  const queue: Queue<GraphNode> = new Queue<GraphNode>();
  node.marked = true;
  queue.add(node);

  while (!queue.isEmpty()) {
    const currentNode = queue.remove();
    if (currentNode) {
      cb(currentNode);
      if (currentNode.adjacents) {
        for (let n of currentNode.adjacents) {
          if (!n.marked) {
            n.marked = true;
            queue.add(n);
          }
        }
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

BFS(A, visit);
