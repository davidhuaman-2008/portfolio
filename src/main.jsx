import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { Analytics } from '@vercel/analytics/react';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <App />
      <Toaster 
        position="bottom-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#0f172a',
            color: '#e2e8f0',
            border: '1px solid #06b6d4',
          },
          success: {
            iconTheme: {
              primary: '#06b6d4',
              secondary: '#0f172a',
            },
          },
        }}
      />
      <Analytics />
    </HelmetProvider>
  </StrictMode>
);