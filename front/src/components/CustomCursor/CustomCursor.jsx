import React from 'react';
import { Rectangle } from 'recharts';

// Component definition: CustomCursor
// Purpose: Renders a custom cursor for charts or graphs
// Props:
//   - points: Array of coordinate points
//   - width: Width of the cursor (default: 100)
//   - height: Height of the cursor (default: 40)
//   - left, right, top, bottom: Offset values for positioning (default: 0)
const CustomCursor = ({ points, width = 100, height = 40, left = 0, right = 0, top = 0, bottom = 0 }) => {
  // Check if points array is empty or undefined
  if (!points || points.length === 0) {
    return null;
  }

  // Extract x and y coordinates from the first point
  const { x, y } = points[0];
  
  // Calculate starting position of the cursor
  const startX = x - left;
  const startY = y - top;

  // Calculate total dimensions of the cursor
  const totalWidth = width + left + right;
  const totalHeight = height + top + bottom;

  // Render the cursor as a Rectangle component from recharts
  return (
    <Rectangle
      fill="rgba(153, 153, 153, 0.5)" // Semi-transparent gray fill
      x={startX}
      y={startY}
      width={totalWidth}
      height={totalHeight}
    />
  );
};

export default CustomCursor;