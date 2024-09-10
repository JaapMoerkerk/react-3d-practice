import React, { useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import Popup from './Popup'; // Assume you have a Popup component

const Model = () => {
    const { scene } = useGLTF('/3d-models/buildingc-v2/buildingc.gltf');
    const [hoveredBay, setHoveredBay] = useState(null);
    const hoverColor = new THREE.Color('green');
    const originalColor = new THREE.Color('lightblue');

    useEffect(() => {
        // Set the initial state when the scene is loaded
        scene.traverse((child) => {
            if (child.name.startsWith('bay')) {
                // Store the original material for restoration
                child.userData.originalMaterial = child.material;
                child.userData.isHovered = false; // State to track hover
                child.material.color.copy(originalColor); // Set default color
            }
        });
    }, [scene]);

    const handlePointerOver = (event) => {
        const bay = event.object;
        const name = bay.name;

        if (name.startsWith('bay')) {
            // Clone the material when the bay is hovered over
            const clonedMaterial = bay.material.clone();
            bay.material = clonedMaterial;
            bay.userData.isHovered = true; // Set hovered state

            // UI friendly name for the bay popup
            const prettyName = `Bay C${name.replace('bay', '')}`;

            setHoveredBay({ name: prettyName, position: bay.position.clone() });
        }
    };

    const handlePointerOut = (event) => {
        const bay = event.object;
        const name = bay.name;

        if (name.startsWith('bay')) {
            // Reset hover state
            bay.userData.isHovered = false;
            setHoveredBay(null);
        }
    };

    useFrame(() => {
        scene.traverse((child) => {
            if (child.name.startsWith('bay')) {
                // Smoothly transition between colors
                const targetColor = child.userData.isHovered ? hoverColor : originalColor;
                child.material.color.lerp(targetColor, 0.1); // Adjust transition speed by changing the 0.1 value
            }
        });
    });

    return (
        <>
            <primitive
                object={scene}
                onPointerOver={handlePointerOver}
                onPointerOut={handlePointerOut}
            />
            {hoveredBay && (
                <Popup position={hoveredBay.position} name={hoveredBay.name} />
            )}
        </>
    );
};

export default Model;
