// src/DynamicPoint.js
import React from 'react';
import { Mesh } from 'three';
import { useFrame } from '@react-three/fiber';

const DynamicPoint = ({ position, type }) => {

    const color = type === 1 ? 'orange' : type === 2 ? 'red' : 'black';
    const meshRef = React.useRef();

    // Optionally, you could add animation or dynamic behavior using useFrame
    useFrame(() => {
        if (meshRef.current) {
            // Custom animation logic could go here (e.g., subtle pulsing, etc.)
        }
    });

    return (
        <mesh ref={meshRef} position={position}>
            {/* SphereGeometry with a radius of 0.5 makes a diameter of 1 */}
            <sphereGeometry args={[0.2, 32, 32]} />
            <meshStandardMaterial color={color} />
        </mesh>
    );
};

export default DynamicPoint;
