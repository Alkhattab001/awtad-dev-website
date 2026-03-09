import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface Props {
  value: string;
  suffix?: string;
  className?: string;
  suffixClassName?: string;
}

function parseNumeric(val: string): { prefix: string; num: number; decimals: number; postfix: string } {
  const match = val.match(/^([^\d]*)([\d,.]+)(.*)$/);
  if (!match) return { prefix: '', num: 0, decimals: 0, postfix: val };
  const raw = match[2].replace(/,/g, '');
  const parts = raw.split('.');
  return {
    prefix: match[1],
    num: parseFloat(raw),
    decimals: parts[1]?.length || 0,
    postfix: match[3],
  };
}

function formatNumber(n: number, decimals: number, original: string): string {
  const hasCommas = original.includes(',');
  const fixed = n.toFixed(decimals);
  if (!hasCommas) return fixed;
  const [int, dec] = fixed.split('.');
  const formatted = int.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return dec ? `${formatted}.${dec}` : formatted;
}

const AnimatedCounter = ({ value, suffix = '', className, suffixClassName }: Props) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [display, setDisplay] = useState('0');
  const { prefix, num, decimals, postfix } = parseNumeric(value);

  useEffect(() => {
    if (!inView || num === 0) return;

    const duration = 2000;
    const fps = 60;
    const totalFrames = Math.round(duration / (1000 / fps));
    let frame = 0;

    // Check prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setDisplay(formatNumber(num, decimals, value));
      return;
    }

    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * num;
      setDisplay(formatNumber(current, decimals, value));
      if (frame >= totalFrames) {
        clearInterval(counter);
        setDisplay(formatNumber(num, decimals, value));
      }
    }, 1000 / fps);

    return () => clearInterval(counter);
  }, [inView, num, decimals, value]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4 }}
      className={className}
    >
      {prefix}{display}{postfix}
      {suffix && <span className={suffixClassName}>{suffix}</span>}
    </motion.span>
  );
};

export default AnimatedCounter;
