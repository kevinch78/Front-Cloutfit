import React from 'react';
import { Loader2 } from 'lucide-react';

const Loader = ({ size = 'md', text = 'Cargando...' }) => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  return (
    <div className="flex flex-col items-center justify-center py-8 md:py-12">
      <Loader2 className={`${sizes[size]} text-primary-600 animate-spin`} />
      {text && (
        <p className="mt-4 text-sm md:text-base text-gray-600">{text}</p>
      )}
    </div>
  );
};

export default Loader;