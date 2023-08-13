import { useState } from 'react';
import { IconButton } from '@chakra-ui/react'
import { Box } from "react-feather";
import { Canvas, useLoader, extend } from '@react-three/fiber';
import { Effects, OrbitControls } from "@react-three/drei";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { FilmPass, UnrealBloomPass } from 'three-stdlib'
import FullScreenViewer from '../shared/fullscreen-viewer';
import styled from 'styled-components';

extend({ UnrealBloomPass, FilmPass });
function Scene() {
  return (
    <>
      <ambientLight intensity={2} />
      <OrbitControls />
      <Effects disableGamma>
        <unrealBloomPass args={[undefined, .3, 1, 0]} />
        <filmPass args={[.75, 0.5, 1000, false]} />
      </Effects>
    </>
  )
}

const Controls = styled.div`
  position: absolute;
  left: 1rem;
  bottom: 1rem;
  z-index: 101;
  color: white;
  font-weight: bold;
  background: rgba(0,0,0,0.5);
  padding: 0.5rem;
`;

export default function RocketViewer() {
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const gltf = useLoader(GLTFLoader, '/falcon9.gltf');
  gltf.materials.White = { r: 0.99, g: 0.99, b: 0.99 };
  gltf.materials.Black = { r: 0.01, g: 0.01, b: 0.01 };

  return (
    <>
      <IconButton
        isRound
        size="sm"
        variant='solid'
        colorScheme="blue"
        icon={<Box />}
        onClick={() => setIsViewerOpen(true)}
        data-testid='view-in-3d'
        aria-label="View in 3D"
      />
      {isViewerOpen && (
        <FullScreenViewer setIsViewerOpen={setIsViewerOpen}>
          <Canvas id="rocket-viewer">
            <primitive object={gltf.scene} />
            <Scene />
          </Canvas>
          <Controls>
            <p>Drag to rotate</p>
            <p>Pinch or scroll to zoom</p>
            <p>Ctrl/Cmd + drag to move</p>
            <p>Esc to close</p>
          </Controls>
        </FullScreenViewer>
      )}
    </>
  )
}
