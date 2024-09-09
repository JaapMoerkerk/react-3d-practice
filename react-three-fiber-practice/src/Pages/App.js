import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, useFBX } from "@react-three/drei";
import '../App.css';

// FactoryModel with position and rotation control
function FactoryModel({ position, rotation }) {
    const { scene } = useGLTF('/3d-models/factory_model_colored.gltf');
    return <primitive object={scene} position={position} rotation={rotation} scale={5} />;
}

// ForkliftModel with WASD control
function ForkliftModel() {
    const { scene } = useGLTF('/3d-models/forklift/forklift.gltf');
    const forkliftRef = useRef();
    const [position, setPosition] = useState([0, 0, 0]); // Initial position [x, y, z]ion, setPosition] = useState([0, 0, 0]); // Initial position [x, y, z]

    // Handle keyboard input to move the forklift
    const handleKeyDown = (event) => {
        const [x, y, z] = position;
        switch (event.key) {
            case 'w': // Move forward (Z-axis+)
                setPosition([x, y, z + 1]);
                break;
            case 's': // Move backward (Z-axis-)
                setPosition([x, y, z - 1]);
                break;
            case 'a': // Move left (X-axis-)
                setPosition([x + 1, y, z]);
                break;
            case 'd': // Move right (X-axis+)
                setPosition([x - 1, y, z]);
                break;
            default:
                break;
        }
    };

    // Attach event listener for keydown
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [position]);

    useFrame(() => {
        if (forkliftRef.current) {
            forkliftRef.current.position.set(...position);
        }
    });

    return <primitive ref={forkliftRef} object={scene} scale={1} />;
}

function App() {
    // State to control FactoryModel's position and rotation
    const [factoryPosition, setFactoryPosition] = useState([0, 0, 0]);
    const [factoryRotation, setFactoryRotation] = useState([0, 0, 0]);

    return (
        <div className="App">
            <div className="canvas-container">
                <Canvas camera={{ position: [-15, 30, -80], fov: 50 }}>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 5]} intensity={1} />

                    {/* Render the FactoryModel with position and rotation controls */}
                    <FactoryModel position={factoryPosition} rotation={factoryRotation} />

                    {/* Render the moving ForkliftModel */}
                    <ForkliftModel />

                    <gridHelper />

                    <OrbitControls
                        enableZoom={true}
                        enablePan={false}  // Disable panning
                        enableRotate={true}  // Disable rotation
                        maxDistance={100}  // Max zoom-out distance
                        minDistance={10}   // Min zoom-in distance
                    />
                </Canvas>
            </div>
        </div>
    );
}

export default App;
