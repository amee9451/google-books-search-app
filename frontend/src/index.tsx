import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './tailwind.css';

const rootElement = document.getElementById('root');
const root = rootElement && ReactDOM.createRoot(rootElement);
root?.render(<App />);
