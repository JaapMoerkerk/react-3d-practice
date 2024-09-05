import React, { useRef } from 'react';
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

function BayLines({ amount }) {
    const storageAreaWidth = 54.4;  // X-axis (East-West)
    const storageAreaDepth = 17.9;  // Z-axis (North-South)
    const angle = (30 * Math.PI) / 180; // Convert 60 degrees to radians
    const baySpacing = storageAreaWidth / (amount + 1); // Calculate spacing between bays

    const vertices = [];

    for (let i = 1; i <= amount; i++) {
        const startX = -storageAreaWidth / 2 + i * baySpacing; // Starting point along the X-axis
        const startZ = storageAreaDepth / 2; // Start from the top edge (Z-axis)

        const endX = startX + storageAreaDepth * Math.tan(angle); // Calculate X-endpoint based on 60-degree angle
        const endZ = -storageAreaDepth / 2; // End at the bottom edge (Z-axis)

        vertices.push(new THREE.Vector3(startX, 0.1, startZ)); // Start position
        vertices.push(new THREE.Vector3(endX, 0.1, endZ)); // End position
    }

    const lineMaterial = new THREE.LineBasicMaterial({ color: 'black' });
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(vertices);
    return <lineSegments geometry={lineGeometry} material={lineMaterial} />;
}

function BuildingC() {
    return (
        <Canvas
            style={{height: '100vh', width: '100vw'}}
            shadows
            camera={{position: [0, 40, 60], fov: 50}} // Top-down view with a slight angle
        >
            <ambientLight intensity={0.5}/>
            <directionalLight
                position={[10, 20, 10]}
                intensity={1}
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
            />

            {/* Storage Area Floor and Surrounding Forklift Path */}
            <StorageAreaFloor/>

            {/* Draw the bays with 60 degree angled lines */}
            <BayLines amount={30}/> {/* Example with 10 bays */}

            <OrbitControls maxPolarAngle={Math.PI / 2}/> {/* Top-down camera controls */}
            <axesHelper position={[0,0,-20]} args={[5]}/>
        </Canvas>
    );
}

export default BuildingC;
