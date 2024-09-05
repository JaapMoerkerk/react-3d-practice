import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

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
                <meshStandardMaterial color="grey" /> {/* Forklift path color */}
            </mesh>

            {/* Storage Area Floor - Red */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow> {/* Slight elevation for visibility */}
                <planeGeometry args={[storageAreaWidth, storageAreaDepth]} />
                <meshStandardMaterial color="red" /> {/* Storage area color */}
            </mesh>

            {/* East-West Division Line */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} receiveShadow> {/* Positioned across the middle, east to west */}
                <planeGeometry args={[storageAreaWidth, divisionLineWidth]} /> {/* Correct east-west direction */}
                <meshStandardMaterial color="yellow" /> {/* Yellow division line */}
            </mesh>

            {/* North-South Walking Path Line */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[walkingPathOffset - storageAreaWidth / 2, 0.02, 0]} receiveShadow> {/* Positioned 16.9 meters from west side */}
                <planeGeometry args={[walkingPathWidth, storageAreaDepth]} />
                <meshStandardMaterial color="blue" /> {/* Blue walking path */}
            </mesh>
        </>
    );
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

            <OrbitControls maxPolarAngle={Math.PI / 2} /> {/* Top-down camera controls */}
        </Canvas>
    );
}

export default BuildingC;
