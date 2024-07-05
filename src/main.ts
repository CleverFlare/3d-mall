import "./root.css";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import "./search-functionality";
import { Pathfinding } from "./pathfinding-class";

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.1,
  9000,
);

const control = new OrbitControls(camera, renderer.domElement);

renderer.setClearColor(0xf0e0d4, 1);

renderer.outputColorSpace = THREE.SRGBColorSpace;

renderer.setPixelRatio(window.devicePixelRatio);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
scene.add(directionalLight);

const spotLight = new THREE.SpotLight(0xffffff, 3, 100, 0.2, 0.5);
spotLight.position.set(0, 25, 0);
scene.add(spotLight);

export const GROUND_Y_AXIS = -130;

export const pathfinding = new Pathfinding(scene);

const loader = new GLTFLoader();

loader.load("models/GLTF.gltf", function (gltf) {
  scene.add(gltf.scene);
  gltf.scene.position.y = -250;
  gltf.scene.receiveShadow = true;
});

camera.position.set(3527, 2025, 50);
camera.lookAt(scene.position); //add this line
control.update();

let step = 0;
let speed = 0.05;

function animate() {
  if (pathfinding.pinMesh) {
    step += speed;
    pathfinding.pinMesh.scene.position.y = 50 * Math.sin(step);
    pathfinding.pinMesh.scene.rotation.y += 0.05;
  }
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
