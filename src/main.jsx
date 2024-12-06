import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from "./Context/Context.jsx"
import process from 'process';
window.process = process;

createRoot(document.getElementById('root')).render(
<CartProvider>
    <App />
  </CartProvider>
)
