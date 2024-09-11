// src/DynamicPoint.js
import React, { useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils';

const DynamicPoint = ({ position, initialFilled }) => {
    const { scene } = useGLTF('/3d-models/paper-reel/paperreel.gltf');
    const clonedScene = clone(scene);
    const [isFilled, setIsFilled] = useState(initialFilled);

    useEffect(() => {
        // Traverse through the cloned scene to find the meshes and clone the materials
        clonedScene.traverse((child) => {
            if (child.isMesh) {
                // Clone the material so each DynamicPoint has its own independent material
                child.material = child.material.clone();
                // Set the color based on the isFilled state
                child.material.color.set(isFilled ? 'red' : 'green');
            }
        });
    }, [isFilled, clonedScene]);

    // Toggle the filled status when the point is clicked
    const handleClick = (event) => {
        event.stopPropagation();
        setIsFilled((prevFilled) => !prevFilled);
    };

    return (
        <primitive object={clonedScene} position={position} onClick={handleClick} />
    );
};

export default DynamicPoint;
