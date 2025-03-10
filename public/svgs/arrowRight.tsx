import React, { memo } from 'react';

const ArrowRight = ({
  width = '14',
  height = '14',
  strokeWidth = '1.5',
  color = '#46484D',
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M8 5L17 12L8 19"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default memo(ArrowRight);
