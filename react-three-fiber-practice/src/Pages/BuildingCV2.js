// src/BuildingCV2.js
import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Model from '../Components/Model';
import DynamicPoint from '../Components/DynamicPoint';
import * as THREE from 'three';
import Forklift from '../Components/Forklift';

const BuildingCV2 = () => {
    const [loading, setLoading] = useState(true);
    const [bayPositions, setBayPositions] = useState([]);
    const [viewMode, setViewMode] = useState('All'); // Default mode: 'All'

    // Storage level vars
    const level1 = 0;
    const level2 = 2.5;
    const dpSpacing = 1.15;
    const angle = THREE.MathUtils.degToRad(-60);
    const defaultDPs = 8;

    // Mock up model useState vars
    const [forkliftPosition, setForkliftPosition] = useState([30, 0.1, 1.2]);
    const [forkliftRotation, setForkliftRotation] = useState([0, Math.PI / 2, 0]);
    const [paperReelPosition, setPaperReelPosition] = useState([5, 0, -5]);

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

    // Toggle between view modes: All, 1, or 2
    const handleToggleMode = () => {
        if (viewMode === 'All') setViewMode('1');
        else if (viewMode === '1') setViewMode('2');
        else setViewMode('All');
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

            if (viewMode === 'All' || viewMode === '1') {
                // Layer 1 (lower level)
                dynamicPoints.push(
                    <DynamicPoint
                        key={`bay-${bayIndex}-dp1-${i}`}
                        position={[
                            bayPosition.x + xOffset,
                            level1,
                            bayPosition.z + zOffset
                        ]}
                        isFilled={false} // Change to true if the spot is filled
                    />
                );
            }

            if (viewMode === 'All' || viewMode === '2') {
                // Layer 2 (upper level)
                dynamicPoints.push(
                    <DynamicPoint
                        key={`bay-${bayIndex}-dp2-${i}`}
                        position={[
                            bayPosition.x + xOffset,
                            level2,
                            bayPosition.z + zOffset
                        ]}
                        isFilled={false} // Change to true if the spot is filled
                    />
                );
            }
        }

        return dynamicPoints;
    };

    return (
        <>
            {/* Toggle Button */}
            <div
                onClick={handleToggleMode}
                style={{
                    position: 'absolute',
                    width: '20px',
                    top: '10px',
                    right: '10px',
                    padding: '10px',
                    backgroundColor: '#484848',
                    color: 'white',
                    cursor: 'pointer',
                    fontFamily: 'Poppins',
                    fontWeight: 'bold',
                    borderRadius: '5px',
                    zIndex: 1, // Ensure the button is on top of the 3D canvas
                }}
            >
                {viewMode}
            </div>

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
                    <Forklift position={forkliftPosition} rotation={forkliftRotation} />
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
