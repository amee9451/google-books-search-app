import { jsx as _jsx } from "react/jsx-runtime";
import ReactDOM from 'react-dom/client';
import App from './App';
import './tailwind.css'; // Tailwind entry
const rootElement = document.getElementById('root');
const root = rootElement && ReactDOM.createRoot(rootElement);
root === null || root === void 0 ? void 0 : root.render(_jsx(App, {}));
