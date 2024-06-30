import "./root.css";
import * as THREE from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/Addons.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const progressBar = document.querySelector(".progress");
const loading = document.querySelector(".loading");

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

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
scene.add(directionalLight);
// directionalLight.position.set(-1227, 1182, 0);

// const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
// scene.add(dLightHelper);

// const gui = new GUI();
//
// const options = {
//   x: -30,
//   y: 50,
//   z: 0,
// };
//
// gui.add(options, "x", -5000, 5000);
// gui.add(options, "y", 0, 5000);
// gui.add(options, "z", 0, 5000);

let controlling = false;

let model: GLTF | null = null;

const loader = new GLTFLoader();
loader.load(
  "models/GLTF.gltf",
  function (gltf) {
    scene.add(gltf.scene);
    model = gltf;
    gltf.scene.position.y = -250;
    gltf.scene.receiveShadow = true;
    gltf.scene.castShadow = true;
  },
  (xhr) => {
    const progress = (xhr.loaded / xhr.total) * 100;
    if (progressBar)
      (progressBar as Element & { style: { width: string } }).style.width =
        progress + "%";

    if (progress === 100)
      setTimeout(() => {
        loading?.classList.add("hide");
      }, 1000);
  },
);

camera.position.set(3527, 2025, 50);
control.update();

window.addEventListener("pointerdown", () => {
  controlling = true;
});
window.addEventListener("pointerup", () => {
  controlling = false;
});

function animate() {
  if (model && !controlling) model.scene.rotation.y += 0.01;
  // directionalLight.position.set(options.x, options.y, options.z);
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
