'use client';

import React from 'react';
import { motion, SVGMotionProps } from 'framer-motion';

import styles from './windowcard.module.css';
import { LucideIcon } from 'lucide-react';
import { TriangleAlert } from 'lucide-react';
interface params {
    motionIcon : React.ComponentType<Record<string, unknown>>;
    text : string;
}

const FallBack = motion(TriangleAlert);

export default function EnhancedWindowCard({motionIcon, text} : params) {

    const MotionIcon = motionIcon || FallBack;

    return (
        <div
        style={{
            width: '29%',
            height: '100%',
            display: 'flex',
            position: 'relative',
            flexDirection: 'column',
            overflow: 'hidden',
            borderRadius: '12px', 
        }}
        >
        <motion.div
            className={styles.midWindow}
            style={{
            bottom: 0,
            backgroundColor: '#050505', 
            position: 'absolute',
            width: '100%',
            borderRadius: '12px',
            }}
            initial={{ height: '0%' }}
            animate={{ height: '100%' }}
            transition={{
            duration: 1,
            ease: [0.16, 1, 0.3, 1], 
            delay: 1.5,
            }}
        />

        <motion.div
            style={{
            position: 'absolute',
            top: '20%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '120px',
            height: '120px',
            background: 'radial-gradient(circle, rgba(0, 255, 255, 0.15) 0%, rgba(0,0,0,0) 70%)',
            pointerEvents: 'none',
            zIndex: 1,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.3, duration: 0.8 }}
        />

        <div
            style={{
            position: 'relative',
            zIndex: 2,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            }}
        >

            <div
            style={{
                height: '60%',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
            >
            <MotionIcon
                className={styles.windowIcon}
                style={{ color: '#ffffff' }}
                initial={{ opacity: 0, scale: 0.6, y: 10 }}
                animate={{
                opacity: 1,
                scale: 1,
                y: [0, -6, 0], 
                }}
                whileHover={{ scale: 1.15, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
                transition={{

                opacity: { delay: 2.3, duration: 0.5 },
                scale: { delay: 2.3, duration: 0.5, type: 'spring', stiffness: 200 },
                y: {
                    repeat: Infinity,
                    duration: 4,
                    ease: 'easeInOut',
                    delay: 2.8,
                },
                }}
            />
            </div>

            <div
            style={{
                height: '40%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px',
            }}
            >

            <motion.div
                style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5, duration: 0.5, ease: 'easeOut' }}
            >

                <motion.span
                style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: '#E8352A', 
                    boxShadow: '0 0 8px #E8352A',
                }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                />

                <span
                className={styles.windowText}
                style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '1rem',
                    fontWeight: 600,
                    letterSpacing: '0.18em', 
                    fontFamily: 'monospace, var(--font-mono)',
                    textTransform: 'uppercase',
                }}
                >
                {text}
                </span>
            </motion.div>
            </div>
        </div>
        </div>
    );
}