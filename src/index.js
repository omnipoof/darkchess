import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import darkChessApp from './reducers';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

let store = createStore(darkChessApp);

render(
    <Provider store={ store }>
        <App />
    </Provider>,
    document.getElementById('root'),
);
registerServiceWorker();
