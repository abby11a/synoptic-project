import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { Suspense } from 'react';

ReactDOM.render(
  <div >
    <Suspense fallback={<div/>}/>
    <App/>
  </div>,
  document.getElementById('root') as HTMLElement
);