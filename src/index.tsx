import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import QueryProvider from './QueryClient.tsx';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <QueryProvider>
    <App />
  </QueryProvider>
);