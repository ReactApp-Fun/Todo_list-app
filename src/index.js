import React from 'react';
import ReactDOM from 'react-dom/client';
import '../src/assets/css_base/index.css';
import App from './App';
import CustomThemeSwitcher from './components/display_part/CustomThemeSwitcher';
import { Provider } from 'react-redux';
import {store} from './redux-saga/store';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CustomThemeSwitcher>
        <App />
      </CustomThemeSwitcher>
    </Provider>
  </React.StrictMode>
);

