// src/DynamicPoint.js
import React from 'react';
import { useGLTF } from '@react-three/drei';

const DynamicPoint = ({ position, isFilled }) => {
    const { scene } = useGLTF('/3d-models/paper-reel/paperreel.gltf');
    const color = isFilled ? 'red' : 'green'; // Red if filled, green if open

    return (
        <primitive
            object={scene}
            position={position}
            scale={1}
        >
        </primitive>
    );
};

export default DynamicPoint;
