import React, { memo } from 'react';

const ArrowLeft = ({
  width = '14',
  height = '14',
  color = '#46484D',
  strokeWidth = '1.5',
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M17 19L8 12L17 5"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default memo(ArrowLeft);
