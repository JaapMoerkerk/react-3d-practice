// src/BuildingCV2.js
import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Model from '../Components/Model';
import DynamicPoint from "../Components/DynamicPoint";

const BuildingCV2 = () => {
    const [loading, setLoading] = useState(true);

    //Storage level vars
    const level1 = 1.3;
    const level2 = 2.5;

    return (
        <>
            {loading && <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white' }}>Loading...</div>}
            <Canvas
                style={{ height: '100vh', width: '100vw' }} // Full-screen canvas
                camera={{ position: [23, 5, 10], fov: 50 }} // Camera setup
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
                <DynamicPoint position={[1, level1, 0]} />
                <DynamicPoint position={[1 ,level2, 0]} />
            </Canvas>
        </>
    );
};

export default BuildingCV2;
