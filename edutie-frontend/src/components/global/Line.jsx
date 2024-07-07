import React, { useRef, useEffect, useState } from "react";
// export default function Line() {
//   globalThis.setInterval(() => {}, 10000);
//   const element1 = document.getElementById("jeden");
//   const coordinates1 = element1.getBoundingClientRect();
//   const element2 = document.getElementById("dwa");
//   const coordinates2 = element2.getBoundingClientRect();
//   console.log("X: " + coordinates1.x + ", Y: " + coordinates1.y);
//   return (
//     <svg>
//       <line
//         stroke="blue"
//         strokeWidth="1"
//         x1={coordinates1.x}
//         x2={coordinates2.x}
//         y1={coordinates1.y}
//         y2={coordinates2.y}
//       />
//       <rect width="128" height="1" stroke="blue" strokeWidth="1"></rect>
//     </svg>
//   );
// }

const PointsConnector = ({ points }) => {
  const lines = [];
  for (let i = 0; i < points.length - 1; i++) {
    const point1 = points[i];
    const point2 = points[i + 1];
    lines.push(
      <line
        key={i}
        x1={point1.x}
        y1={point1.y}
        x2={point2.x}
        y2={point2.y}
        stroke="grey"
        strokeWidth="5"
      />
    );
  }

  return <svg>{lines}</svg>;
};

export default PointsConnector;
