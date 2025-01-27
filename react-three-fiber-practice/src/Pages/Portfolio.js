import {Canvas} from "@react-three/fiber";
import Factory from "../Components/Factory";
import * as THREE from 'three';
import { useFrame } from "@react-three/fiber";
import React, {useState, useEffect, useRef} from "react";
import machineData from "../Data/machinedata.json";

function CameraController({ currentIndex, machineData }) {
  const animationRef = useRef({
    fromVec: new THREE.Vector3(),
    toVec: new THREE.Vector3(),
    fromLook: new THREE.Vector3(),
    toLook: new THREE.Vector3(),
    progress: 1, // Start "done" so we don't animate on first render
    duration: 1.0, // seconds for full transition
    oldIndex: currentIndex
  });

  useFrame(({ camera }, delta) => {
    const state = animationRef.current;

    // If progress < 1, we are in the middle of an animation
    if (state.progress < 1) {
      // advance progress by (delta / duration)
      state.progress += delta / state.duration;
      if (state.progress > 1) {
        state.progress = 1; // clamp at 1
      }

      // Interpolate camera position
      const lerpedPos = new THREE.Vector3().lerpVectors(
        state.fromVec,
        state.toVec,
        state.progress
      );
      camera.position.copy(lerpedPos);

      // Optionally interpolate lookAt
      const lerpedLook = new THREE.Vector3().lerpVectors(
        state.fromLook,
        state.toLook,
        state.progress
      );
      camera.lookAt(lerpedLook);
      camera.updateProjectionMatrix();
    } else {
      // Once we reach the target, ensure final lookAt is correct
      camera.lookAt(state.toLook);
    }
  });

  // When currentIndex changes, set up a new "from" / "to" animation
  useEffect(() => {
    const state = animationRef.current;

    // If we're switching machines, capture the camera’s current as "from"...
    if (state.oldIndex !== currentIndex) {

      state.fromVec.copy(state.progress < 1 ? state.fromVec : state.toVec);
      state.fromLook.copy(state.progress < 1 ? state.fromLook : state.toLook);

      // Now define the new target from machineData
      const { position: nextPos, target: nextLook } = machineData.machineData[currentIndex].cameraPosition;
      
      state.toVec.set(...nextPos);
      state.toLook.set(...nextLook);

      // Reset progress to 0 for a fresh animation
      state.progress = 0;
      state.oldIndex = currentIndex;
    }
  }, [currentIndex, machineData]);

  return null; // This component doesn't render anything
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

    const { name, description, date, path } = machineData.machineData[currentIndex];

    return (
        <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
            {/* Fullscreen Canvas */}
            <Canvas
                style={{ position: 'absolute', top: 0, left: 0 }}
                camera={{ position: [-60, 28, -120], fov: 50 }}
                target={{ target: [5, 0, -110]}}
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
                <CameraController currentIndex={currentIndex} machineData={machineData} />
            </Canvas>

            {/* Top Navigation (Arrow Buttons) */}
            <div
                style={{
                    position: 'absolute',
                    display: "flex",
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    top: '50%',
                    width: '55%',
                    left: '2.5%',
                    // transform: 'translateX(-50%)',
                    zIndex: 20,
                }}
            >
                <button onClick={handlePrev}
                style={{
                    fontSize: '1em',
                    cursor: 'pointer',
                    padding: '10px',
                    borderRadius: '10px',
                    border: 'none',
                    background: 'orange',
                    }}
                >
                    Previous
                </button>
                <button onClick={handleNext}
                style={{
                    fontSize: '1em',
                    cursor: 'pointer',
                    padding: '10px',
                    borderRadius: '10px',
                    border: 'none',
                    background: 'lightgreen'
                    }}
                >
                    Next
                </button>
            </div>

            {/* Sidebar with Machine Info */}
            <div
                style={{
                    fontSize: '1.2em',
                    position: 'absolute',
                    display: 'flex',
                    flexDirection: 'column',
                    alignContent: 'center',
                    textAlign: 'center',
                    justifyContent: 'start',
                    top: 0,
                    right: 0,
                    width: '40%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    color: '#fff',
                    padding: '2vh 0',
                    boxSizing: 'border-box',
                    zIndex: 10,
                    fontFamily: "Poppins"
                }}
            >
                <h2
                style={{
                    height: '5%',
                }}>{name}</h2>
                <p
                style={{
                    height: '5%'
                }}>
                    <strong>Time period:</strong> {date}
                </p>
                <p 
                style={{
                    height: '35%',
                    width: '90%',
                    margin: 'auto',
                }}>{description}</p>
                <img src={path} alt={`${name} in real life`} style={{
                    maxHeight: '45vh',
                    maxWidth: '35vw',
                    margin: 'auto',
                }}></img>
            </div>
        </div>
    );
};

export default Portfolio;