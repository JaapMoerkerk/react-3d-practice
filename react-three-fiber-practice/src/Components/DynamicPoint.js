// src/DynamicPoint.js
import React from 'react';
import { Mesh } from 'three';
import { useFrame } from '@react-three/fiber';

const DynamicPoint = ({ position }) => {

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
            <sphereGeometry args={[0.3, 32, 32]} />
            <meshStandardMaterial color="brown" />
        </mesh>
    );
};

export default DynamicPoint;
