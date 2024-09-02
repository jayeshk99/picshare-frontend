// src/components/LoadingComponent.tsx
import React from 'react';
import './LoadingComponent.css'; // Assuming CSS is in the same relative path

interface LoadingComponentProps {
  text: string;
}

const LoadingComponent: React.FC<LoadingComponentProps> = ({ text }) => {
  return (
    <div className="loading">
      {text} <span className="dots">...</span>
    </div>
  );
};

export default LoadingComponent;
