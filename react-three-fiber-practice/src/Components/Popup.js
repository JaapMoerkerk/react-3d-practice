// src/Popup.js
import React from 'react';
import { Html } from '@react-three/drei';

const Popup = ({ position, name }) => {

    const offsetPosition = [position.x - 3, position.y + 5, position.z];
    return (
        <Html position={offsetPosition} center>
            <div style={{
                color: 'white',
                fontFamily: "Poppins",
                background: '#484848',
                border: '1px solid #484848',
                padding: '15px',
                borderRadius: '7px',
                pointerEvents: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: "center",
            }}>
                {name}
            </div>
        </Html>
    );
};

export default Popup;
