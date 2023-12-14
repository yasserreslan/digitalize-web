import React, { useState } from 'react';
import CreateAdminComponent from './components/CreateAdminComponent';
import ShowUsers from './components/ShowUsers';
import SystemSettings from './components/SystemSettings';

export default function AdminPage() {
  const [activeComponent, setActiveComponent] = useState('createAdmin');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'createAdmin':
        return <CreateAdminComponent />;
      case 'showUsers':
        return <ShowUsers />;
      case 'systemSettings':
        return <SystemSettings/>;
      default:
        return <ShowUsers/>;
    }
  };


  return (
    <div className="admin-container">
      <div className="sidebar">
        <button onClick={() => setActiveComponent('createAdmin')}>Create Admin</button>
        <button onClick={() => setActiveComponent('showUsers')}>Show Users</button>
        <button onClick={() => setActiveComponent('systemSettings')}>System Settings</button>
      </div>
      <div className="content">
        {renderComponent()}
      </div>
    </div>
  );
}
