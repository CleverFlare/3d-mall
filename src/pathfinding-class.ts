import * as THREE from "three";
import { areas } from "./areas";
import { GROUND_Y_AXIS } from "./main";
import { aStarPathfinder } from "./a-star";
import { GLTF, GLTFLoader } from "three/examples/jsm/Addons.js";

export class Pathfinding {
  start: number = 0;
  goal: number = 0;
  rendered: boolean = false;
  paths: { position: THREE.Vector3; neighbors: any[] }[] = [];
  startMesh: THREE.Mesh;
  goalMesh: THREE.Mesh;
  lineMesh?: THREE.Mesh;
  pinMesh?: GLTF;

  constructor(public scene: THREE.Scene) {
    this.paths = areas.map((area) => ({
      position: new THREE.Vector3(area.x, GROUND_Y_AXIS, area.z),
      neighbors: area.neighbors,
    }));

    const startSphereGeometry = new THREE.SphereGeometry(60, 32, 16);
    const goalSphereGeometry = new THREE.SphereGeometry(40, 32, 16);
    const blueMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      transparent: true,
    });
    const whiteMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
    });

    const startPointSphere = new THREE.Mesh(startSphereGeometry, whiteMaterial);
    this.startMesh = startPointSphere;

    const gaolPointSphere = new THREE.Mesh(goalSphereGeometry, blueMaterial);

    this.goalMesh = gaolPointSphere;

    const loader = new GLTFLoader();

    loader.load("models/pin.glb", (gltf) => {
      this.pinMesh = gltf;
      gltf.scene.scale.set(350, 350, 350);
    });
  }

  update({ start, goal }: { start?: number; goal?: number }) {
    if (start) this.start = start;
    if (goal) this.goal = goal;

    this.updatePath();
  }

  updatePath() {
    this.clear();
    const path = aStarPathfinder(this.start, this.goal, this.paths);

    const curve = new THREE.CatmullRomCurve3(path, false, "catmullrom", 0);

    const tubeGeometry = new THREE.TubeGeometry(curve, 65, 30, 65);
    const tubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.lineMesh = new THREE.Mesh(tubeGeometry, tubeMaterial);

    this.startMesh.position.set(
      areas[this.start].x,
      GROUND_Y_AXIS,
      areas[this.start].z,
    );

    this.goalMesh.position.set(
      areas[this.goal].x,
      GROUND_Y_AXIS,
      areas[this.goal].z,
    );

    if (this.pinMesh)
      this.pinMesh.scene.position.set(
        areas[this.goal].x,
        GROUND_Y_AXIS,
        areas[this.goal].z,
      );

    this.scene.add(this.startMesh);
    this.scene.add(this.goalMesh);
    if (this.pinMesh) this.scene.add(this.pinMesh.scene);
    this.scene.add(this.lineMesh);
  }

  clear() {
    this.scene.remove(this.startMesh);
    this.scene.remove(this.goalMesh);
    this.scene.remove(this.pinMesh!.scene);

    if (this.lineMesh) this.scene.remove(this.lineMesh);
  }
}
