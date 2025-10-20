import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx'; // This is YOUR App component
import { App as AntdApp } from 'antd'; // This is the Ant Design App provider
import 'antd/dist/reset.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* We wrap YOUR App inside Ant Design's App */}
    <AntdApp>
      <App />
    </AntdApp>
  </React.StrictMode>
);