import React from 'react';
import { render } from 'react-dom'
import '@babel/polyfill'


import App from './Components/App.js';

render(
    <App/>,
    document.getElementById('app')
)
