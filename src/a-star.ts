import * as THREE from "three";

class Node {
  constructor(
    public position: THREE.Vector3,
    public neighbors: number[],
    public h: number = 0,
    public g: number = 0,
    public parent: Node | null = null,
  ) {}

  get f() {
    return this.h + this.g;
  }
}

function getHeuristic(a: THREE.Vector3, b: THREE.Vector3) {
  return a.distanceTo(b);
}

export function aStarPathfinder(
  start: number,
  goal: number,
  points: { position: THREE.Vector3; neighbors: number[] }[],
): THREE.Vector3[] {
  const nodes = points.map(
    (point) => new Node(point.position, point.neighbors),
  );

  const openSet: Set<Node> = new Set();

  const closedSet: Set<Node> = new Set();

  openSet.add(nodes[start]);

  let path: THREE.Vector3[] = [];

  while (openSet.size > 0) {
    let current = new Node(new THREE.Vector3(0, 0, 0), [], Infinity, Infinity);
    for (const node of openSet) {
      if (node.f < current.f) {
        current = node;
      }
    }

    if (current === nodes[goal]) {
      console.log("DONE!!");
      path = [];
      path.push(current.position);
      while (current.parent !== null) {
        path.push(current.parent.position);
        current = current.parent;
      }
      return path.reverse();
    }

    openSet.delete(current);
    closedSet.add(current);

    for (const neighbor of current.neighbors) {
      if (closedSet.has(nodes[neighbor])) continue;

      let tempG =
        current.g + current.position.distanceTo(nodes[neighbor].position);

      if (openSet.has(nodes[neighbor])) {
        if (tempG < nodes[neighbor].g) nodes[neighbor].g = tempG;
      } else {
        nodes[neighbor].g = tempG;
        openSet.add(nodes[neighbor]);
      }

      nodes[neighbor].h = getHeuristic(
        nodes[neighbor].position,
        nodes[goal].position,
      );
      nodes[neighbor].parent = current;
    }
  }

  return path;
}
