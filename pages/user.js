import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function UserPage() {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const fetchDevices = async () => {
      const token = localStorage.getItem('digitalize_token');
      try {
        const response = await axios.get('http://localhost:8000/devices/', {
          headers: { Authorization: token }
        });
        setDevices(response.data);
      } catch (error) {
        console.error(error);
        // Handle error
      }
    };

    fetchDevices();
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('digitalize_token');
    window.location.href = '/';
  };

  return (
    <div>
      <button onClick={handleSignOut} className="sign-out-button">Sign Out</button>
      <div className="devices">
        <h1 style={{ color: '#6a4dac' }}>My Devices:</h1>
        {devices.map(device => (
          <div key={device.id} className="device">
            <div>Device ID: {device.device_id}</div>
            <div>Device type: {device.device_type}</div>
            <div>Status: {device.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
