import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import 'bootswatch/dist/materia/bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const storeInstance = store();

ReactDOM.render(
  <Provider store={storeInstance}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
 </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
