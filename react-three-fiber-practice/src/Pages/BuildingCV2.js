// src/BuildingCV2.js
import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Model from '../Components/Model';
import DynamicPoint from '../Components/DynamicPoint';
import * as THREE from 'three';

const BuildingCV2 = () => {
    const [loading, setLoading] = useState(true);
    const [bayPositions, setBayPositions] = useState([]);

    // Storage level vars
    const level1 = 0.6;
    const level2 = 1.5;
    const dpSpacing = 1.15;
    const angle = THREE.MathUtils.degToRad(-60);
    const defaultDPs = 8;

    // Hard-coded exceptions for specific bays
    const dpExceptions = {
        1: 2,
        31: 2,
        32: 2,
        62: 2,
        2: 5,
        30: 5,
        33: 5,
        61: 5,
    };

    // Callback to receive bay positions from Model
    const handleBayPositionsRetrieved = (positions) => {
        setBayPositions(positions);
    };

    // Generate Dynamic Points for each bay, with exceptions
    const generateDynamicPointsForBay = (bayPosition, bayIndex) => {
        const dynamicPoints = [];
        const dpPerBay = dpExceptions[bayIndex + 1] || defaultDPs; // Check if bay has an exception, else use default

        const halfPoints = dpPerBay / 2;

        for (let i = 0; i < dpPerBay; i++) {
            const xOffset = Math.cos(angle) * dpSpacing * (i - (halfPoints - 0.5));
            const zOffset = Math.sin(angle) * dpSpacing * (i - (halfPoints - 0.5));

            // Layer 1 (lower level)
            dynamicPoints.push(
                <DynamicPoint
                    key={`${bayPosition.x}-${bayPosition.z}-dp1-${i}`}
                    position={[
                        bayPosition.x + xOffset,
                        level1,
                        bayPosition.z + zOffset
                    ]}
                    type={1}
                />
            );

            // Layer 2 (upper level)
            dynamicPoints.push(
                <DynamicPoint
                    key={`${bayPosition.x}-${bayPosition.z}-dp2-${i}`}
                    position={[
                        bayPosition.x + xOffset,
                        level2,
                        bayPosition.z + zOffset
                    ]}
                    type={2}
                />
            );
        }

        return dynamicPoints;
    };

    return (
        <>
            {loading && (
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: 'white',
                    }}
                >
                    Loading...
                </div>
            )}
            <Canvas
                style={{ height: '100vh', width: '100vw' }}
                camera={{ position: [23, 5, 10], fov: 50 }}
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
                    <Model onBayPositionsRetrieved={handleBayPositionsRetrieved} />
                </Suspense>

                {/* Generate dynamic points for each bay */}
                {bayPositions.map((bayPosition, index) => (
                    <React.Fragment key={`bay-${index}`}>
                        {generateDynamicPointsForBay(bayPosition, index)}
                    </React.Fragment>
                ))}
            </Canvas>
        </>
    );
};

export default BuildingCV2;
