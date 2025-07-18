import React from 'react';
import ReactDOM from 'react-dom/client';
import '../src/assets/css_base/index.css';
import App from './App';
import CustomThemeSwitcher from './components/display_part/CustomThemeSwitcher';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CustomThemeSwitcher>
      <App />
    </CustomThemeSwitcher>
  </React.StrictMode>
);

