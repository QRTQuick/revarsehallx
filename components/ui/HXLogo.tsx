import React from 'react';

interface HXLogoProps {
  size?: number;
  className?: string;
}

const HXLogo: React.FC<HXLogoProps> = ({ size = 32, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background circle */}
      <circle cx="50" cy="50" r="48" fill="#000000" stroke="#dc2626" strokeWidth="4" />
      
      {/* Orange accent sides */}
      <path d="M 10 30 Q 10 10 30 10 L 70 10 Q 90 10 90 30" fill="none" stroke="#f97316" strokeWidth="3" />
      <path d="M 10 70 Q 10 90 30 90 L 70 90 Q 90 90 90 70" fill="none" stroke="#f97316" strokeWidth="3" />
      
      {/* H letter */}
      <g fill="#dc2626">
        <rect x="20" y="25" width="6" height="50" />
        <rect x="20" y="47" width="20" height="6" />
        <rect x="34" y="25" width="6" height="50" />
      </g>
      
      {/* X letter */}
      <g fill="#dc2626">
        <rect x="60" y="25" width="6" height="50" transform="rotate(45 63 50)" />
        <rect x="60" y="25" width="6" height="50" transform="rotate(-45 63 50)" />
      </g>
    </svg>
  );
};

export default HXLogo;