import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Grass from './Grass';

function App() {
  const refContainer = useRef(null);

  useEffect(() => {
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    refContainer.current.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight
    );
    camera.position.set(-7, 4, 7);
    camera.lookAt(0, 0, 0);

    const controls = new OrbitControls(camera, renderer.domElement);
    // Ograniczenie przybliżania i oddalania, wielkość pola z trawą itp.
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.maxPolarAngle = Math.PI / 2.2;
    controls.minDistance = 4;
    controls.maxDistance = 17;

    const scene = new THREE.Scene();

    // Dodanie oświetlenia
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 0);
    scene.add(directionalLight);

    // Ładowanie trawy
    const grass = new Grass(60, 500000);
    scene.add(grass);

    // Ładowanie modelu piłki
    const loader = new GLTFLoader();
    loader.load('ball/clball.glb', (gltf) => {
      gltf.scene.position.set(0, 1.3, 0);
      gltf.scene.rotation.y = THREE.MathUtils.degToRad(225);
      gltf.scene.scale.set(1.8, 1.8, 1.8);
      scene.add(gltf.scene);
    });

    // Ładowanie panoramicznego obrazu 360 stopni
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('ball/st1.jpg', (texture) => {
      const geometry = new THREE.CylinderGeometry(800, 800, 2000, 60, 1, true);
      geometry.scale(-1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
      const cylinder = new THREE.Mesh(geometry, material);
      cylinder.position.y = 225;
      scene.add(cylinder);
    });

    // Animacja
    renderer.setAnimationLoop((time) => {
      grass.update(time);
      controls.update();
      renderer.render(scene, camera);
    });

    return () => {
      refContainer.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={refContainer}></div>;
}

export default App;
