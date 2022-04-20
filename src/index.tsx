import React from 'react';
import ReactDom from 'react-dom';
import App from './app';
import { double } from './utils/index';

console.log(double(2));

ReactDom.render(<App />, document.getElementById('root'));
