export enum GraphType {
  Graph = "Graph",
  Tree = "Tree",
}

type GraphNode = {
  name: string;
  adjacents: string[];
  visited?: false;
};

export class Graph {
  nodes: Map<string, string[]>;
  type: GraphType;

  constructor(type: GraphType) {
    this.nodes = new Map();
    this.type = type;
  }

  addNode(name: string, adjacents: string[]): string {
    this.nodes.set(name, adjacents);

    return name;
  }

  removeNode(name: string): boolean {
    return this.nodes.delete(name);
  }

  getNode(name: string): GraphNode | undefined {
    if (this.nodes.has(name)) {
      return { name, adjacents: this.nodes.get(name)! };
    } else {
      return undefined;
    }
  }

  getNodes(): GraphNode[] {
    return Array.from(this.nodes.entries()).map(([name, adjacents]) => ({
      name,
      adjacents,
    }));
  }
}
