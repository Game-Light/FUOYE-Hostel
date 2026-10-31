'use client';

import React from 'react';

interface MaterialIconProps {
  name: string;
  className?: string;
  size?: number;
  fill?: boolean;
}

export const MaterialIcon: React.FC<MaterialIconProps> = ({
  name,
  className = '',
  size = 20,
  fill = false,
}) => {
  return (
    <span
      aria-hidden="true"
      className={`material-symbols-rounded select-none leading-none inline-flex items-center justify-center ${className}`}
      style={{
        fontSize: `${size}px`,
        fontVariationSettings: `'FILL' ${fill ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' 24`,
      }}
    >
      {name}
    </span>
  );
};
