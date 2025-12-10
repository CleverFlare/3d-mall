import "./root.css";
import * as THREE from "three";
import { DRACOLoader, GLTFLoader } from "three/examples/jsm/Addons.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import "./search-functionality";
import { Pathfinding } from "./pathfinding";

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

// Limit the rotation (prevent revealing the bottom)
control.minPolarAngle = 0.3;
control.maxPolarAngle = Math.PI * 0.5;

// Prevent flipping or weird rotations
control.enablePan = false;
control.enableZoom = true;
control.screenSpacePanning = false;

renderer.setClearColor(0xf0e0d4, 1);

renderer.outputColorSpace = THREE.SRGBColorSpace;

renderer.setPixelRatio(window.devicePixelRatio);

const ambientLight1 = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientLight1);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
scene.add(directionalLight);

const spotLight = new THREE.SpotLight(0xffffff, 3, 100, 0.2, 0.5);
spotLight.position.set(0, 25, 0);
scene.add(spotLight);

export const GROUND_Y_AXIS = -130;

export const pathfinding = new Pathfinding(scene);

const loader = new GLTFLoader();

const dracoLoader = new DRACOLoader();

dracoLoader.setDecoderPath("/draco/");

loader.setDRACOLoader(dracoLoader);

loader.load("models/Madinty.glb", function (gltf) {
  scene.add(gltf.scene);
  gltf.scene.scale.set(2000, 2000, 2000);
  gltf.scene.position.y = -250;

  const ambientLight = new THREE.AmbientLight(0xffffff, 4);
  gltf.scene.add(ambientLight);

  // Compute center of the model
  const box = new THREE.Box3().setFromObject(gltf.scene);
  const center = box.getCenter(new THREE.Vector3());

  // Desired offset: in FRONT of the model
  // Assuming +Z is “front”. If your model's forward axis is -Z, reverse this.
  const distance = 3000; // adjust as needed
  const vertical = 1500; // height of the camera

  // Move camera in front
  const offset = new THREE.Vector3(0, vertical, distance);

  // OPTIONAL: rotate offset 90° around Y-axis
  // If you need the camera to rotate to the front relative to the current side view:
  offset.applyAxisAngle(new THREE.Vector3(1, 0, 0), 0); // no X rotation
  offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), (Math.PI / 2) * 4); // rotate 90°
  offset.applyAxisAngle(new THREE.Vector3(0, 0, 1), 0);

  // Apply to camera
  camera.position.copy(center.clone().add(offset));

  // Make camera look at model
  control.target.copy(center);
  control.update();
});

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
