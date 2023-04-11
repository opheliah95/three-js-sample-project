import * as THREE from 'three';
import "./style.css";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import gsap from "gsap";

const scene = new THREE.Scene();

// size control for window
const size = {
    width: window.innerWidth,
    height: window.innerHeight
}

// add donut
const geometry = new THREE.SphereGeometry(15, 32, 16);
const material = new THREE.MeshStandardMaterial({ color: 0xffff00, roughness: 0.4 });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// add a camera to look at torus
const camera = new THREE.PerspectiveCamera(75, size.width / size.height, 0.1, 100);
camera.position.z = 50;
scene.add(camera);

// add a light
const light = new THREE.PointLight(0x404040, 3.5, 500); // soft white light
light.position.set(30, 20, 100);
scene.add(light);


// render scene to screen
const canvas = document.querySelector(".webgl")
const renderer = new THREE.WebGLRenderer({ canvas });
console.log(canvas)
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.render(scene, camera);

// camera orbit control
const controls = new OrbitControls( camera, canvas );
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 5;
controls.update();

//resize window
window.addEventListener('resize', () => {
    console.log(`resize height: ${window.innerHeight}`)
    size.width = window.innerWidth,
        size.height = window.innerHeight
    //update camera
    camera.updateProjectionMatrix();
    camera.aspect = size.width / size.height;
    renderer.setSize(size.width, size.height)
})

// loop animation
const loop = () => {
    controls.update();
    renderer.render(scene, camera)
    window.requestAnimationFrame(loop)
}

loop()

// timeline animation
const timeline = gsap.timeline({defaults:{duration: 1}})
timeline.fromTo(sphere.scale, {z:0, x:0, y:0}, {z:1, x:1, y:1})
timeline.fromTo("nav", {y: "-100%"}, {y:"0%"})
timeline.fromTo(".title", {opacity: 0}, {opacity: 1})