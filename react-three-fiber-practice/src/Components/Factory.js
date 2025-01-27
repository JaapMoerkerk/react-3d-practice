import {useGLTF} from "@react-three/drei";
import React from "react";

const Factory = () => {
    const { scene } = useGLTF('/3d-models/factory/model.gltf');

return <primitive object={scene} />;
};

export default Factory;