import React from 'react';
import { Html } from '@react-three/drei';

const Popup = ({ position, name }) => {
    return (
        <Html position={position} style={{ pointerEvents: 'none' }}>
            <div style={{
                background: 'white',
                padding: '5px',
                borderRadius: '3px',
                boxShadow: '0px 0px 5px rgba(0,0,0,0.5)',
                fontSize: '14px',
            }}>
                {name}
            </div>
        </Html>
    );
};

export default Popup;
