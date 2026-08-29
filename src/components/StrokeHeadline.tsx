'use client';

import { motion } from 'framer-motion';
import data from '../data/headline-paths.json';

function splitSubpaths(d: string): string[] {
  const matches = d.match(/[Mm][^Mm]*/g);
  return (matches ?? [d]).map((sub) => sub.trim() + ' Z');
}

export default function StrokeHeadline() {
  const { x, y, width, height } = data.viewBox;

  return (
    <svg
      viewBox={`${x} ${y} ${width} ${height}`}
      width="100%"
      style={{ maxWidth: 600 }}
    >
      {data.paths.map((d, i) => {
        if (!d) return null; // skip space / empty glyphs
        const subpaths = splitSubpaths(d);
        return (
          <g key={i}>
            {subpaths.map((sub, j) => (
              <motion.path
                key={j}
                d={sub}
                fill="transparent"
                stroke="black"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: 'easeInOut' }}
              />
            ))}
          </g>
        );
      })}
    </svg>
  );
}