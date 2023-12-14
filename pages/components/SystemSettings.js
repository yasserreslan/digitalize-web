import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function SystemSettings() {
  const [settings, setSettings] = useState([]);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const token = localStorage.getItem('digitalize_token');
        const response = await axios.get('http://localhost:8000/settings/',{headers: { Authorization: token }});
        setSettings(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSettings();
  }, []);

  const handleToggle = async (settingId) => {
    try {
      const token = localStorage.getItem('digitalize_token');
      const response = await axios.post('http://127.0.0.1:8000/settings/toggle_registration/', {}, {
        headers: {
            Authorization: token
        }
      });
  
      setSettings(settings.map(setting => 
        setting.setting_id === settingId ? { ...setting, setting_value: response.data.new_status } : setting
      ));
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  const debounce = (func, wait) => {
    let timeout;
  
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
  
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  const handleChange = (settingId, newValue) => {
    // This function will be debounced
    const sendUpdateRequest = debounce(async () => {
      try {
        const token = localStorage.getItem('digitalize_token');
        const response = await axios.post('http://127.0.0.1:8000/settings/registration_limit/', {
            limit: newValue
          }, {
            headers: {
                Authorization: token
            }
          });
  
        // Update the state to reflect the change
        setSettings(settings.map(setting => 
          setting.setting_id === settingId ? { ...setting, setting_value: newValue } : setting
        ));
      } catch (error) {
        console.error(error);
        // Handle error
      }
    }, 2000); // 2 second delay
  
    sendUpdateRequest();
  };



  return (
    <div className="settings-container">
      {settings.map(setting => (
        <div key={setting.setting_id} className="setting">
          <span>{setting.setting_name}</span>
          {setting.setting_name === 'user_registration' ? (
            <button onClick={() => handleToggle(setting.setting_id, setting.setting_value)}>
              {setting.setting_value === 'active' ? 'Deactivate' : 'Activate'}
            </button>
          ) : setting.setting_name === 'daily_registration_limit' ? (
            <input
                type="number"
                value={setting.setting_value}
                onChange={(e) => handleChange(setting.setting_id, e.target.value)}
                />
          ) : null}
        </div>
      ))}
    </div>
  );
}
