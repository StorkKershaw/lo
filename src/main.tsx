import { RouterProvider } from '@tanstack/react-router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { router } from '@/router';
import { panic } from '@/utils';
import '@/main.css';

const root = document.getElementById('root') ?? panic('Root element not found');
createRoot(root).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
