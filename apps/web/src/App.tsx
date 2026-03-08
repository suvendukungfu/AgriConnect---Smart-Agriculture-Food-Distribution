import React from 'react';
import { AppRoutes } from './routes';
import './App.css';

export default function App() {
  return (
    <div className="App bg-background text-foreground min-h-screen">
      <AppRoutes />
    </div>
  );
}
