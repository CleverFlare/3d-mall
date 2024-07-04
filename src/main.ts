import "./root.css";
import * as THREE from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/Addons.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";
import { areas } from "./areas";
import { aStarPathfinder } from "./a-star";
import "./search-functionality";

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
// directionalLight.position.set(-1227, 1182, 0);

// const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
// scene.add(dLightHelper);

const gui = new GUI();

const options = {
  x: 0,
  y: 0,
  z: 0,
};

gui.add(options, "x");
gui.add(options, "y");
gui.add(options, "z");

const groundYAxis = -130;

// for (const area of areas) {
//   // if (area.type === "crossroad") continue;
//   const mesh = new THREE.Mesh(sphereGeom, blueMaterial);
//   mesh.position.set(area.x, groundYAxis, area.z);
//   mesh.castShadow = true;
//   scene.add(mesh);
// }

const pathPoints = areas.map((area) => ({
  position: new THREE.Vector3(area.x, groundYAxis, area.z),
  neighbors: area.neighbors,
}));

const startPoint = 0;
const goalPoint = 7;

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
startPointSphere.position.set(
  areas[startPoint].x,
  groundYAxis,
  areas[startPoint].z,
);
scene.add(startPointSphere);

const gaolPointSphere = new THREE.Mesh(goalSphereGeometry, blueMaterial);
gaolPointSphere.position.set(
  areas[goalPoint].x,
  groundYAxis,
  areas[goalPoint].z,
);
scene.add(gaolPointSphere);

const rightPath = aStarPathfinder(startPoint, goalPoint, pathPoints);

// const optimalPath = aStar(points, startPoint, goalPoint);

// console.log(optimalPath);

//
//
// const playerAreaSphere = new THREE.Mesh(sphereGeom, blueMaterial);
// playerAreaSphere.castShadow = true;
// playerAreaSphere.position.set(1310, groundYAxis, 390);
// scene.add(playerAreaSphere);
//
// const alahlyATMSphere = new THREE.Mesh(sphereGeom, blueMaterial);
// alahlyATMSphere.castShadow = true;
// alahlyATMSphere.position.set(1854, groundYAxis, 1020);
// scene.add(alahlyATMSphere);
//
// const secondCrossSphere = new THREE.Mesh(sphereGeom, blueMaterial);
// secondCrossSphere.castShadow = true;
// secondCrossSphere.position.set(801, groundYAxis, 380);
// scene.add(secondCrossSphere);
//
// const masrATMSphere = new THREE.Mesh(sphereGeom, blueMaterial);
// masrATMSphere.castShadow = true;
// masrATMSphere.position.set(801, groundYAxis, 1020);
// scene.add(masrATMSphere);
//
// const cibATMSphere = new THREE.Mesh(sphereGeom, blueMaterial);
// cibATMSphere.castShadow = true;
// cibATMSphere.position.set(804, groundYAxis, -550);
// scene.add(cibATMSphere);
//
// const testSphere = new THREE.Mesh(sphereGeom, blueMaterial);
// testSphere.castShadow = true;
// scene.add(testSphere);

// // Create a CurvePath
// const curvePath = new THREE.CurvePath();

// Add straight lines and bezier curves to the CurvePath
// for (let i = 0; i < rightPath.length - 1; i++) {
//   if (i > 0)
//     curvePath.add(new THREE.LineCurve3(rightPath[i], rightPath[i - 1]));
//   else curvePath.add(new THREE.LineCurve3(rightPath[i]));
// const startPoint = new THREE.Vector3(
//   rightPath[i].x,
//   rightPath[i].y,
//   rightPath[i].z,
// );
// const endPoint = new THREE.Vector3(
//   rightPath[i + 1].x,
//   rightPath[i + 1].y,
//   rightPath[i + 1].z,
// );
//
// if (i === 0) {
//   // Start with a LineCurve3
//   curvePath.add(new THREE.LineCurve3(startPoint, endPoint));
// } else {
//   // Use QuadraticBezierCurve3 for rounded corners
//   const previousPoint = new THREE.Vector3(
//     rightPath[i - 1].x,
//     rightPath[i - 1].y,
//     rightPath[i - 1].z,
//   );
//   const controlPoint = new THREE.Vector3()
//     .copy(startPoint)
//     .lerp(previousPoint, 0.5);
//
//   curvePath.add(
//     new THREE.QuadraticBezierCurve3(previousPoint, controlPoint, startPoint),
//   );
// }
// }

// let lineGeometry = roundedCornerLine(rightPath, 20, 12, false);
// let lineMaterial = new THREE.LineBasicMaterial({ color: 0x0098ff });
//
// let line = new THREE.Line(lineGeometry, lineMaterial);
//
// scene.add(line);

const curve = new THREE.CatmullRomCurve3(rightPath, false, "catmullrom", 0);

const tubeGeometry = new THREE.TubeGeometry(curve, 65, 30, 65);
const tubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
scene.add(tube);

// let model: GLTF | null = null;

const loader = new GLTFLoader();
loader.load("models/GLTF.gltf", function (gltf) {
  scene.add(gltf.scene);
  // model = gltf;
  gltf.scene.position.y = -250;
  gltf.scene.receiveShadow = true;
});

let pinModel: GLTF | null = null;

loader.load("models/pin.glb", function (gltf) {
  scene.add(gltf.scene);
  pinModel = gltf;
  gltf.scene.scale.set(350, 350, 350);
  gltf.scene.position.set(areas[goalPoint].x, groundYAxis, areas[goalPoint].z);
});

camera.position.set(3527, 2025, 50);
camera.lookAt(scene.position); //add this line
control.update();

let step = 0;
let speed = 0.05;

function animate() {
  // if (model && !controlling) model.scene.rotation.y += 0.01;
  // model?.scene.position.set(options.x, groundYAxis, options.z);
  if (pinModel !== null) {
    step += speed;
    pinModel.scene.position.y = 50 * Math.sin(step);
    pinModel.scene.rotation.y += 0.05;
  }
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
