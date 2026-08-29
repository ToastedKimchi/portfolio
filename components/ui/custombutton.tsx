'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { LucideProps, ArrowUpRight } from 'lucide-react';
import styles from './custombutton.module.css';

export interface CustomActionButtonProps {
  text: string;
  icon?: React.ComponentType<LucideProps>;
  onClick?: () => void;
  entryDelay?: number;
}

const backdropVariants: Variants = {
  rest: { opacity: 0, scale: 0.8 },
  hover: { opacity: 1, scale: 1.15 },
};

const iconVariants: Variants = {
  rest: { rotate: 0, scale: 1 },
  hover: { rotate: 45, scale: 1.1 },
};

const textWrapperVariants: Variants = {
  rest: { width: 0, opacity: 0 },
  hover: { width: 'auto', opacity: 1 },
};

const textVariants: Variants = {
  rest: { x: -10 },
  hover: { x: 0 },
};

export default function CustomActionButton({
  text,
  icon: Icon = ArrowUpRight,
  onClick,
  entryDelay = 3.3,
}: CustomActionButtonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: entryDelay,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ display: 'inline-block' }}
    >
      <motion.button
        className={styles.buttonContainer}
        onClick={onClick}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
      >
        <motion.div
          className={styles.glowBackdrop}
          variants={backdropVariants}
          transition={{ duration: 0.3 }}
        />

        <div className={styles.buttonBody}>

          <div className={styles.iconWrapper}>
            <span className={styles.idlePulseRing} />
            <motion.div
              variants={iconVariants}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <Icon size={18} className={styles.icon} />
            </motion.div>
          </div>

          <motion.div
            className={styles.textWrapper}
            variants={textWrapperVariants}
            transition={{
              duration: 0.35,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <motion.span
              className={styles.buttonText}
              variants={textVariants}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {text}
            </motion.span>
          </motion.div>
        </div>
      </motion.button>
    </motion.div>
  );
}