import React from 'react';
import { useGLTF } from '@react-three/drei';

function Ball() {
  const { scene } = useGLTF('ball/clball.glb');
  return <primitive object={scene} scale={[0.5, 0.5, 0.5]} position={[0, 0.5, 0]} />;
}

export default Ball;
