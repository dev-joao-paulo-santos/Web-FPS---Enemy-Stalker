//Tem um erro nesse código, que é esse: "Uncaught TypeError: Cannot read properties of undefined (reading '4') at main.js:51:33"

import * as THREE from 'three';

import {OrbitControls} from 'OrbitControls'
import {PointerLockControls} from 'PointerLockControls'



function start(){
const scene = new THREE.Scene();

scene.background = new THREE.Color(0xaaaaff)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


const texture = new THREE.TextureLoader()


const material = new THREE.MeshBasicMaterial({ 
   transparent: true,
   side: THREE.DoubleSide, 
  map: texture.load('obunga.png')})

const cube = new THREE.Mesh(
  new THREE.PlaneGeometry(7, 5),
  material
);
cube.position.y = 1
cube.position.z = -150

const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(500, 500),
  new THREE.MeshBasicMaterial({ color: 0x004400, side: THREE.DoubleSide})

)

scene.add(ground)
ground.rotation.x = Math.atan(90)
ground.position.y = -2.6


const mesh1 = new THREE.Mesh(
  new THREE.BoxGeometry(7, 7, 7),
  new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide})
)
scene.add(mesh1)
mesh1.position.x = -10


//uso do mouse para movimentar a câmera quando clicar na janela do navegador
const controls = new PointerLockControls(camera, renderer.domElement)
window.addEventListener('click', ()=>{
    controls.lock()
})



// definição de controles de direção
let tec = []

document.addEventListener('keydown', (e)=>{

    tec[e.keyCode] = true;

})
document.addEventListener('keyup', (e)=>{

    tec[e.keyCode] = false;

})
const clock = new THREE.Clock()
function walk(){
    if(tec[87]) controls.moveForward(0.5)
    if(tec[65]) controls.moveRight(-0.5)
    if(tec[83]) controls.moveForward(-0.5)
    if(tec[68]) controls.moveRight(0.5)
    if(tec[16]) controls.moveForward(.8)

}
//pulos
let jumpSpeed = 0;
const gravity = -0.05;

document.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
    jumpSpeed = .6;
  }
});


scene.add(cube);

camera.position.z = -15

function animate() {
  requestAnimationFrame(animate);

  //faz o 'cube' ficar "olhando" sempre para a posição da câmera
  cube.lookAt(camera.position);

  texture.needsUpdate = true

// Aqui há a perseguição. A cada frame que passa, o 'cube' se aproxima a 20% da distância entre ele e a câmera.
  cube.position.x += (camera.position.x - cube.position.x) * 0.02;
  cube.position.y += (camera.position.y - cube.position.y) * 0.02;
 cube.position.z += (camera.position.z - cube.position.z) * 0.02;

jumpSpeed += gravity;
  controls.getObject().position.y += jumpSpeed;

  // Se a câmera chegar ao solo, para a sua queda
  if (controls.getObject().position.y < 0) {
    controls.getObject().position.y = 0;
    jumpSpeed = 0;
  }


const delta = clock.getDelta()
walk(delta)

  renderer.render(scene, camera);
};

animate()
}

var confirmar = confirm("Clique em OK para começar o jogo")
//se apertar o botão de ok o jogo começa 
if (confirmar == true) start();