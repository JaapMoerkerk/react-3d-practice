import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function Inventory({ position, setPosition, cloudPoints }) {
    const inventoryRef = useRef();
    const [isMoving, setIsMoving] = useState(false);
    const [stoppedTime, setStoppedTime] = useState(0); // Tracks how long the box has been stopped

    // WASD movement
    const handleKeyDown = (event) => {
        const [x, y, z] = position;
        setIsMoving(true);

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

    // Monitor movement and check for snapping after 2 seconds of no movement
    useEffect(() => {
        if (isMoving) {
            setStoppedTime(0); // Reset stopped time if moving
        } else {
            const interval = setInterval(() => {
                setStoppedTime((prev) => prev + 1);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [isMoving]);

    // Snapping mechanism when stopped for 2 full seconds
    useEffect(() => {
        if (stoppedTime >= 2) {
            const closestPoint = cloudPoints.find((point) => {
                const [x, y, z] = position;
                const distance = Math.sqrt(
                    Math.pow(point[0] - x, 2) + Math.pow(point[1] - y, 2) + Math.pow(point[2] - z, 2)
                );
                return distance < 2; // Define the reach (2 units in this case)
            });

            if (closestPoint) {
                // Snap the inventory to the closest point
                setPosition(closestPoint);
            }
        }
    }, [stoppedTime, position, cloudPoints]);

    useFrame(() => {
        if (inventoryRef.current) {
            inventoryRef.current.position.set(...position);
        }
        // Check if the object is moving (no key pressed for a while)
        setIsMoving(false);
    });

    return (
        <mesh ref={inventoryRef} position={position}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="orange" />
        </mesh>
    );
}

function DynamicCloudPoints() {
    const [position, setPosition] = useState([2, 0, 2]); // Initial position

    const cloudPoints = [
        [5, 0, 5],
        [10, 0, 10],
        [5, 0, -5],
        [-5, 0, 5],
        [0, 0, 10],
        [-10, 0, -5],
        [-5, 0, 10],
        [7, 0, -7],
        [-8, 0, 2],
        [3, 0, -9]
    ];

    return (
        <Canvas style={{ height: '100vh', width: '100vw' }}>
            <ambientLight intensity={0.5} />
            <gridHelper args={[20, 20]} /> {/* Grid for reference */}

            {/* Inventory component simulating drop-off */}
            <Inventory position={position} setPosition={setPosition} cloudPoints={cloudPoints} />

            {/* Visualize the dynamic cloud points */}
            {cloudPoints.map((point, index) => (
                <mesh key={index} position={point}>
                    <sphereGeometry args={[0.2, 16, 16]} />
                    <meshStandardMaterial color="blue" />
                </mesh>
            ))}

            <OrbitControls />
        </Canvas>
    );
}

export default DynamicCloudPoints;
