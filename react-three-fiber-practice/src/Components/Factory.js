import {useAnimations, useGLTF} from "@react-three/drei";
import React, { useEffect } from "react";

const ANIMATION_NAMES = [
        "eterna-s1-slicer-blade-aAction",
        "eterna-s1-slicer-blade-bAction",
        "eterna-s1-slicer-blade-cAction",
        "eterna-s1-slicer-blade-dAction",
        "eterna-s1-slicer-blade-eAction",
        "eterna-s3-splinter-stack1aAction",
        "eterna-s3-splinter-stack1bAction",
        "eterna-s3-splinter-stack1cAction",
        "eterna-s3-splinter-stack2aAction",
        "eterna-s3-splinter-stack2bAction",
        "eterna-s3-splinter-stack3aAction",
        "eterna-s3-splinter-stack3bAction",
        "eterna-s4-cardboard-aAction",
        "eterna-s4-cardboard-bAction",
        "eterna-s4-cardboard-cAction",
        "eterna-s4-cardboard-dAction",
        "eterna-s4-movingextension-poleAction",
        "emba245-s3-cardboard-aAction",
        "emba245-s3-cardboard-bAction",
        "emba245-s3-cardboard-cAction",
        "emba245-s3-cardboard-dAction",
        "emba245-s3-cardboard-eAction",
        "emba245-s3-cardboard-fAction",
        "emba245-s3-cardboard-gAction",
        "emba245-s3-cardboard-hAction",
        "emba245-s3-cardboard-iAction",
        "emba245-s4-stacker-aAction",
        "emba245-s4-stacker-bAction",
        "emba245-s5-cardboard-aAction",
        "emba245-s5-cardboard-bAction",
        "emba245-s5-cardboard-cAction",
        "emba245-s5-cardboard-dAction",
        "emba245-s5-cardboard-eAction",
        "emba245-s5-cardboard-fAction",
        "emba245-s5-cardboard-gAction",
        "emba245-s5-cardboard-hAction",
        "emba245-s5-cardboardstack-aAction",
        "emba245-s5-cardboardstack-bAction",
        "emba245-s5-cardboardstack-cAction",
        "emba245-s6-strapperAction",
        "emba245-s6-trianglepusher-aAction",
        "emba245-s6-trianglepusher-bAction",
        "emba160-cardboard-rail-aAction",
        "emba160-cardboard-rail-bAction",
        "emba160-cardboard-rail-cAction",
        "emba160-cardboard-rail-dAction",
        "emba160-cardboard-rail-eAction",
        "emba160-cardboard-rail-fAction",
        "emba160-cardboard-rail-gAction",
        "emba160-cardboard-rail-hAction",
        "emba160-cardboard-rail-iAction",
        "emba160-cardboard-rail-jAction",
        "emba160-cardboard-rail-kAction",
        "emba160-cardboard-rail-lAction",
        "emba160-cardboard-rail-mAction",
        "emba160-cardboard-rail-nAction",
        "emba160-cardboard-rail-oAction",
        "emba160-cardboard-rail-pAction",
        "emba160-cardboard-rail-qAction",
        "emba160-cardboardstackAction",
        "emba160-industrialroll-aAction",
        "emba160-industrialroll-bAction",
        "emba160-industrialroll-cAction",
        "emba160-industrialroll-dAction",
        "emba160-industrialroll-eAction",
        "emba160-industrialroll-fAction",
        "emba160-industrialroll-gAction",
        "emba160-industrialroll-hAction",
        "emba160-s1-cardboard-aAction",
        "emba160-s1-cardboard-bAction",
        "emba160-s1-cardboard-cAction",
        "emba160-s1-cardboard-dAction",
        "emba160-sliding-railAction",
        "corrugator-s16-elevator-receiverAction",
        "ArmatureAction",
]

const Factory = () => {
    const { scene, animations } = useGLTF('/3d-models/factory/model.gltf');
    const { ref, actions } = useAnimations(animations, scene);

    useEffect(() => {
        ANIMATION_NAMES.forEach((animName) => {
          if (actions[animName]) {
            actions[animName].reset().play();
          }
        });
      }, [actions]);
    
      return <primitive ref={ref} object={scene} />;
    }
    
    export default Factory;