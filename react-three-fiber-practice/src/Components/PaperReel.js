// src/PaperReel.js
import React from 'react';
import { useGLTF } from '@react-three/drei';

const PaperReel = ({ position = [0, 0, 0] }) => {
    const { scene } = useGLTF('/3d-models/paper-reel/paperreel.gltf');

    return (
        <primitive
            object={scene}
            position={position}
            scale={1} // Use the model's current scale
        />
    );
};

export default PaperReel;
