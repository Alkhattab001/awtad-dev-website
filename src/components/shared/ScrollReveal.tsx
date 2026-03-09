import { motion, type Variant } from 'framer-motion';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  duration?: number;
}

const directionMap: Record<string, { x?: number; y?: number }> = {
  up: { y: 24 },
  down: { y: -24 },
  left: { x: 24 },
  right: { x: -24 },
};

const ScrollReveal = ({ children, className, delay = 0, direction = 'up', distance, duration = 0.6 }: Props) => {
  const offset = directionMap[direction];
  const d = distance ?? (offset.y ?? offset.x ?? 24);

  const hidden: Variant = {
    opacity: 0,
    ...(offset.y !== undefined ? { y: d } : { x: d }),
  };
  const visible: Variant = {
    opacity: 1,
    y: 0,
    x: 0,
    transition: { delay, duration, ease: [0, 0, 0.2, 1] },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{ hidden, visible }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
