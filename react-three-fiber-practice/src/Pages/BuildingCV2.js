// src/BuildingCV2.js

import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

// Component to load and render the GLTF model
const Model = () => {
    const { scene } = useGLTF('/3d-models/buildingc-v2/buildingc.gltf');
    return <primitive object={scene} />;
};

const BuildingCV2 = () => {
    const [loading, setLoading] = useState(true);

    return (
        <>
            {loading && <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white' }}>Loading...</div>}
            <Canvas
                style={{ height: '100vh', width: '100vw' }} // Full-screen canvas
                camera={{ position: [0, 5, 10], fov: 50 }} // Camera setup
                onCreated={({ gl }) => {
                    gl.setAnimationLoop(() => setLoading(false));
                }}
            >
                {/* Ambient light for general illumination */}
                <ambientLight intensity={0.5} />
                {/* Directional light for casting shadows */}
                <directionalLight position={[10, 10, 5]} intensity={1} />
                {/* Controls for rotating, panning, and zooming */}
                <OrbitControls />
                {/* Suspense to handle model loading */}
                <Suspense fallback={null}>
                    <Model />
                </Suspense>
            </Canvas>
        </>
    );
};

export default BuildingCV2;
