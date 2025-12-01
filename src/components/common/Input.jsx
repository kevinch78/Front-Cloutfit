import React, { forwardRef } from 'react';

const Input = forwardRef(({
  label,
  type = 'text',
  placeholder,
  error,
  icon,
  className = '',
  ...props
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-gray-700 text-sm md:text-base font-medium mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          className={`
            w-full px-4 py-3 text-sm md:text-base
            ${icon ? 'pl-10' : 'pl-4'}
            border rounded-lg
            ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary-500'}
            focus:outline-none focus:ring-2 focus:border-transparent
            transition-all duration-300 bg-white
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500 animate-fade-in">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;