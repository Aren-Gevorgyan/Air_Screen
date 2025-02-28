import React, { memo } from 'react';

const MenuIcon = ({ width = '38', height = '38', fill = 'none', color = 'white' }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 38 38"
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M4.75 11.0834H33.25" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M4.75 19H33.25" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M4.75 26.9166H33.25" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export default memo(MenuIcon);
