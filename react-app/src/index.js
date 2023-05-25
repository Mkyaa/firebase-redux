import React from 'react';
import ReactDOM from 'react-dom/client';

// css
import './index.css';

//pages
import App from './App';

//redux
import { Provider } from 'react-redux';
import store from './redux/app/store';

//react router dom
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
);
