import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

//CSS
import './index.css'

//Swiper (Carrousels)
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
