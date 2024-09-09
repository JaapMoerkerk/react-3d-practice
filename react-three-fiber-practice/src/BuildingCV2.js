import React from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { MeshStandardMaterial } from 'three';
import { useState } from 'react';

function InteractiveModel() {
    const { nodes, materials } = useLoader(GLTFLoader, '/public/3d-models/buildingc-v2/buildingc.gltf');
    const [hovered, setHovered] = useState(null);

    return (
        <group>
            {Object.entries(nodes).map(([key, node]) => (
                <mesh
                    key={key}
                    geometry={node.geometry}
                    material={materials[key]}
                    onPointerOver={() => setHovered(key)}
                    onPointerOut={() => setHovered(null)}
                >
                    <meshStandardMaterial
                        attach="material"
                        color={hovered === key ? 'yellow' : 'gray'}
                    />
                </mesh>
            ))}
        </group>
    );
}

function BuildingCV2() {
    return (
        <Canvas>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <InteractiveModel />
        </Canvas>
    );
}

export default BuildingCV2;
