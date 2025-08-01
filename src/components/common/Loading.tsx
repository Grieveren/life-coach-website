import React, { memo } from 'react';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
  inline?: boolean;
  fullScreen?: boolean;
}

const Loading: React.FC<LoadingProps> = memo(({ 
  size = 'md', 
  text = 'Loading...', 
  className = '',
  inline = false,
  fullScreen = false
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  const containerClasses = fullScreen
    ? 'fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50'
    : inline
    ? `inline-flex items-center space-x-2 ${className}`
    : `flex items-center justify-center space-x-2 ${className}`;

  return (
    <div className={containerClasses} role="status" aria-live="polite">
      <svg 
        className={`animate-spin ${sizeClasses[size]} text-teal-600`} 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle 
          className="opacity-25" 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          strokeWidth="4"
        />
        <path 
          className="opacity-75" 
          fill="currentColor" 
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      {text && (
        <span className={`text-gray-600 ${textSizeClasses[size]}`} aria-label={text}>
          {text}
        </span>
      )}
    </div>
  );
});

Loading.displayName = 'Loading';

export default Loading;