import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ShowUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('digitalize_token');
        const host = window.location.host;
        const url = `http://${host}`;

        const response = await axios.get(`${url}/api/users/`,{headers: { Authorization: token }});
        
        setUsers(response.data);

      } catch (error) {
        console.error(error);
        // Handle error
      }
    };

    fetchUsers();
  }, []);


  const toggleDeviceStatus = async (userId, deviceId, currentStatus) => {
    try {
      const token = localStorage.getItem('digitalize_token');
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      const host = window.location.host;
      const url = `http://${host}`;
      const response = await axios.post(`${url}/api/devices/status/`, { user_id:userId, device_id:deviceId },{headers: { Authorization: token }});

      // Update the state to reflect the change
      setUsers(users.map(user => {
        if (user.user_id === userId) {
          return {
            ...user,
            devices: user.devices.map(device => 
              device.device_id === deviceId ? { ...device, status: newStatus } : device
            )
          };
        }
        return user;
      }));
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  return (
    <div className="users-container">
      {users.map(user => (
        <div key={user.user_id} className="user">
          <h3>{user.username}</h3>
          <div className="devices-list">
            {user.devices.map(device => (
              <div key={device.device_id} className="device">
                <span>{device.device_id} ({device.device_type}) - {device.status}</span>
                <button 
                  onClick={() => toggleDeviceStatus(user.user_id, device.device_id, device.status)}
                  className={`toggle-status-button ${device.status}`}
                >
                  {device.status === 'active' ? 'Deactivate' : 'Activate'}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
