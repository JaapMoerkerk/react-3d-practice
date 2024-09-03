import React, { useRef } from 'react';
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import './App.css';

function HouseModel() {
    const gltf = useGLTF('/3d-models/first-sims-house/scene.gltf');
    const modelRef1 = useRef();
    const modelRef2 = useRef();

    // Use the frame loop to ensure both models are rendered correctly
    useFrame(() => {
        if (modelRef1.current && modelRef2.current) {
            modelRef2.current.position.set(2.5, 0, 0); // Position the second model further back
            modelRef2.current.rotation.set(0, Math.PI, 0); // Rotate the second model 180 degrees
        }
    });

    return (
        <>
            {/* First instance of the model */}
            <primitive ref={modelRef1} object={gltf.scene.clone()} />

            {/* Second instance of the model */}
            <primitive ref={modelRef2} object={gltf.scene.clone()} />
        </>
    );
}

function App() {
    return (
        <div className="App">
            <div className="canvas-container">
                <Canvas camera={{ position: [0, 2, 2], fov: 50 }}>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 5]} intensity={1} />

                    {/* Render the HouseModel component which contains both instances */}
                    <HouseModel />
                    <gridHelper />

                    <OrbitControls
                        enableZoom={true}
                        enablePan={true}  // Disable panning
                        enableRotate={true}  // Disable rotation
                        maxDistance={15}  // Max zoom-out distance (adjust as needed)
                        minDistance={5}   // Min zoom-in distance (adjust as needed)
                    />
                </Canvas>
            </div>
        </div>
    );
}

export default App;
