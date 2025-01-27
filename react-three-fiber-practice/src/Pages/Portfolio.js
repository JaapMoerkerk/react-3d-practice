import {Canvas} from "@react-three/fiber";
import Factory from "../Components/Factory";
import * as THREE from 'three';
import { useFrame } from "@react-three/fiber";
import React, {useState, useEffect} from "react";
import machineData from "../Data/machinedata.json";

function CameraController({ currentIndex }) {
    // Machine info from JSON
    const targetPos = machineData.machineData[currentIndex].cameraPosition.position;
    const targetLook = machineData.machineData[currentIndex].cameraPosition.target;

    useFrame(({ camera }, delta) => {
        camera.position.lerp(new THREE.Vector3(...targetPos), 0.1);
        camera.lookAt(...targetLook);
        camera.updateProjectionMatrix();
    });
    return null;
}

const Portfolio = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % machineData.machineData.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) =>
        prev === 0 ? machineData.machineData.length - 1 : prev - 1
        );
    };

    const { name, description, date } = machineData.machineData[currentIndex];

    return (
        <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
            {/* Fullscreen Canvas */}
            <Canvas
                style={{ position: 'absolute', top: 0, left: 0 }}
                camera={{ position: [23, 5, 10], fov: 50 }}
                onCreated={({ gl }) => {
                    // Enable proper color management for standard/gamma-corrected materials
                    gl.toneMapping = THREE.ACESFilmicToneMapping;
                    gl.toneMappingExposure = 1;
                }}
            >
                {/* Ambient light for general illumination */}
                <ambientLight intensity={0.5} />
                {/* Directional light for casting shadows */}
                <directionalLight position={[10, 10, 5]} intensity={1} />
                {/* Your 3D model */}
                <Factory />

                {/* Smooth camera transitions */}
                <CameraController currentIndex={currentIndex} />
            </Canvas>

            {/* Top Navigation (Arrow Buttons) */}
            <div
                style={{
                    position: 'absolute',
                    display: "flex",
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    top: '50%',
                    width: '95%',
                    left: '2.5%',
                    // transform: 'translateX(-50%)',
                    zIndex: 20,
                }}
            >
                <button onClick={handlePrev} style={{ marginRight: 10 }}>
                    &larr; Prev
                </button>
                <button onClick={handleNext}>Next &rarr;</button>
            </div>

            {/* Sidebar with Machine Info */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '35%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    color: '#fff',
                    padding: '20px',
                    boxSizing: 'border-box',
                    zIndex: 10,
                }}
            >
                <h2>{name}</h2>
                <p>
                    <strong>Date Created:</strong> {date}
                </p>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default Portfolio;