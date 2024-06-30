import "./root.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

const control = new OrbitControls(camera, renderer.domElement);

const boxGeometry = new THREE.BoxGeometry();

const boxMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });

const box = new THREE.Mesh(boxGeometry, boxMaterial);

renderer.setClearColor(0xf0e0d4, 1);

scene.add(box);

const ambientLight = new THREE.AmbientLight(0x444444);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
scene.add(directionalLight);
directionalLight.position.set(-30, 50, 0);
directionalLight.castShadow = true;
directionalLight.shadow.camera.bottom = -12;

// const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
// scene.add(dLightHelper);

// const dLightShadowHelper = new THREE.CameraHelper(
//   directionalLight.shadow.camera,
// );
//
// scene.add(dLightShadowHelper);

camera.position.set(0, 0, 5);
control.update();

function animate() {
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
