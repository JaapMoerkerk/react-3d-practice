// src/Forklift.js
import React, { useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const Forklift = ({ startX = 50, stopX = 3, rotation = [0, Math.PI / 2, 0] }) => {
    const { scene } = useGLTF('/3d-models/forklift/forklift.gltf');
    const [position, setPosition] = useState([startX, 0.1, 1.2]);

    // Smoothly move the forklift until it reaches stopX position
    useFrame(() => {
        setPosition((prevPosition) => {
            if (prevPosition[0] > stopX) {
                return [
                    prevPosition[0] - 0.03, // Decrease X-axis smoothly
                    prevPosition[1], // Keep Y the same
                    prevPosition[2], // Keep Z the same
                ];
            } else {
                return prevPosition; // Stop movement when X=3
            }
        });
    });

    return (
        <primitive
            object={scene}
            position={position}
            rotation={rotation}
            scale={1} // Use the model's current scale
        />
    );
};

export default Forklift;
