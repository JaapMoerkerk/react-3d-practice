import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1 style={{color: "red", fontWeight: 800}}>Dakri Cartons Ltd</h1>
                <h2>
                Digital Twin practice hub
                </h2>

            <nav style={{ marginTop: '30px' }}>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    <li style={{ marginBottom: '10px' }}>
                        <Link to="/app" style={{ fontSize: '20px', textDecoration: 'none', color: 'blue' }}>
                            Building model
                        </Link>
                    </li>
                    <li style={{ marginBottom: '10px' }}>
                        <Link to="/dynamic-cloud-points" style={{ fontSize: '20px', textDecoration: 'none', color: 'blue' }}>
                            Dynamic Cloud Points snapping demo
                        </Link>
                    </li>
                    <li style={{ marginBottom: '10px' }}>
                        <Link to="/buildingc" style={{ fontSize: '20px', textDecoration: 'none', color: 'blue' }}>
                            Building C (V1)
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Home;