import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function StorageAreaFloor() {
    const storageAreaWidth = 54.4;  // X-axis (East-West)
    const storageAreaDepth = 17.9;  // Z-axis (North-South)
    const forkliftPathWidth = 4;    // 4-meter surrounding path
    const divisionLineWidth = 0.2;  // East-West division line width
    const walkingPathWidth = 0.7;   // North-South walking path width
    const walkingPathOffset = 16.9; // Distance from the west side for the walking path

    return (
        <>
            {/* Surrounding Forklift Path - Grey */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
                <planeGeometry args={[storageAreaWidth + forkliftPathWidth * 2, storageAreaDepth + forkliftPathWidth * 2]} />
                <meshStandardMaterial color="grey" />
            </mesh>

            {/* Storage Area Floor - Red */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
                <planeGeometry args={[storageAreaWidth, storageAreaDepth]} />
                <meshStandardMaterial color="red" />
            </mesh>

            {/* East-West Division Line */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} receiveShadow>
                <planeGeometry args={[storageAreaWidth, divisionLineWidth]} />
                <meshStandardMaterial color="yellow" />
            </mesh>

            {/* North-South Walking Path Line */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[walkingPathOffset - storageAreaWidth / 2, 0.02, 0]} receiveShadow>
                <planeGeometry args={[walkingPathWidth, storageAreaDepth]} />
                <meshStandardMaterial color="blue" />
            </mesh>
        </>
    );
}

function SouthBays({ bayCount }) {
    const storageAreaWidth = 54.4;  // X-axis (East-West)
    const storageAreaDepth = 17.9;  // Z-axis (North-South)
    const angle = Math.PI / 6;  // 30 degrees in radians
    const baySpacing = storageAreaWidth / bayCount;  // Calculate spacing between bays

    const bayLines = [];

    for (let i = 0; i <= bayCount; i++) {
        const startX = -storageAreaWidth / 2 + i * baySpacing;  // Starting X position
        const startZ = -storageAreaDepth / 2;  // Starting Z position (bottom of the south half)

        // Calculate the ending X and Z positions using the 30-degree angle
        let endX = startX + storageAreaDepth * Math.tan(angle);  // X position after the line is angled
        let endZ = 0;  // The Z position for the division line

        // If the line hits the east or west side, adjust its end position to stay within bounds
        if (endX > storageAreaWidth / 2) {
            const overreach = (endX - storageAreaWidth / 2) / Math.tan(angle);  // Calculate how far the line would go outside
            endX = storageAreaWidth / 2;  // Clamp it to the storage area's boundary
            endZ = startZ + overreach;  // Adjust the end Z position accordingly
        } else if (endX < -storageAreaWidth / 2) {
            const overreach = (-storageAreaWidth / 2 - endX) / Math.tan(angle);  // Calculate how far the line would go outside
            endX = -storageAreaWidth / 2;  // Clamp it to the west boundary
            endZ = startZ + overreach;  // Adjust the end Z position accordingly
        }

        // Create vertices for each bay line
        const vertices = [
            new THREE.Vector3(startX, 0.1, startZ),  // Start position
            new THREE.Vector3(endX, 0.1, endZ)  // End position
        ];

        // Create the line geometry and material
        const lineMaterial = new THREE.LineBasicMaterial({ color: 'green' });
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(vertices);

        // Add each bay line to the array
        bayLines.push(<line key={i} geometry={lineGeometry} material={lineMaterial} />);
    }

    return <>{bayLines}</>;
}

function BuildingC() {
    return (
        <Canvas
            style={{ height: '100vh', width: '100vw' }}
            shadows
            camera={{ position: [0, 40, 60], fov: 50 }} // Top-down view with a slight angle
        >
            <ambientLight intensity={0.5} />
            <directionalLight
                position={[10, 20, 10]}
                intensity={1}
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
            />

            {/* Storage Area Floor and Surrounding Forklift Path */}
            <StorageAreaFloor />

            {/* Draw the south half bay lines */}
            <SouthBays bayCount={30} />

            <OrbitControls maxPolarAngle={Math.PI / 2} /> {/* Top-down camera controls */}
            <axesHelper position={[0, 0, -20]} args={[5]} />
        </Canvas>
    );
}

export default BuildingC;
