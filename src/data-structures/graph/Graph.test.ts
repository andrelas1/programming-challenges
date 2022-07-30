import { Graph, GraphType } from "./Graph";

describe("Graph", () => {
  it("should create an instance", () => {
    const graph = new Graph(GraphType.Graph);
    expect(graph).toBeInstanceOf(Graph);
  });

  it("should add a node", () => {
    const graph = new Graph(GraphType.Graph);
    const name = graph.addNode("A", ["B", "C"]);
    expect(name).toBe("A");
  });

  it("should remove a node", () => {
    const graph = new Graph(GraphType.Graph);
    graph.addNode("A", ["B", "C"]);
    expect(graph.removeNode("A")).toBe(true);
  });

  it("should return false when removing a node that does not exist", () => {
    const graph = new Graph(GraphType.Graph);
    expect(graph.removeNode("A")).toBe(false);
  });

  it("should return a node", () => {
    const graph = new Graph(GraphType.Graph);
    graph.addNode("A", ["B", "C"]);
    expect(graph.getNode("A")).toEqual({ name: "A", adjacents: ["B", "C"] });
  });

  it("should return undefined when getting a node that does not exist", () => {
    const graph = new Graph(GraphType.Graph);
    expect(graph.getNode("A")).toBeUndefined();
  });

  it("should return a list of nodes", () => {
    const graph = new Graph(GraphType.Graph);
    graph.addNode("A", ["B", "C"]);
    graph.addNode("B", ["C", "D"]);

    expect(graph.getNodes()).toEqual([
      { name: "A", adjacents: ["B", "C"] },
      { name: "B", adjacents: ["C", "D"] },
    ]);
  });
});

describe("Operations in a graph", () => {
  describe("Breadth-first search", () => {});
  describe("Depth-first search", () => {});
});
