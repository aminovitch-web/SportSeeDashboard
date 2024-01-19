import React from 'react';
import { Rectangle } from 'recharts';

const CustomCursor = ({ points, width = 100, height = 40, left = 0, right = 0, top = 0, bottom = 0 }) => {
  if (!points || points.length === 0) {
    return null;
  }

  
  const { x, y } = points[0];
  const startX = x - left;
  const startY = y - top;


  const totalWidth = width + left + right;
  const totalHeight = height + top + bottom;

  return (
    <Rectangle
      fill="rgba(153, 153, 153, 0.5)" 
      x={startX}
      y={startY}
      width={totalWidth}
      height={totalHeight}
    />
  );
};

export default CustomCursor;
