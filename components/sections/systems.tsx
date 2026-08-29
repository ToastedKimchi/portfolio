'use client'
import { motion } from 'motion/react';
import styles from './systems.module.css';

const SPECS = [
    { label: 'CONTROL LOOP', value: 'PID + feedforward, 3-DOF parallel actuation' },
    { label: 'PERCEPTION', value: 'IMU fusion, MediaPipe pose tracking' },
    { label: 'PLATFORM', value: 'ESP32, Qt HUD, TCP/WebSocket bridges' },
    { label: 'SIM LAYER', value: 'PyBullet physics, inverse kinematics' },
];

export default function Systems() {
    return (
        <section id="systems" className={styles.systems}>
            <span className="eyebrow">CORE DISCIPLINE</span>
            <h2 className={styles.title}>
                The stack between <br /> metal and model.
            </h2>
            <p className={styles.desc}>
                Most people stop at the software. I keep going until it moves something 
                closing the loop between a sensor reading, a control algorithm, and a
                physical actuator. Then I build the interface that lets a human watch it think.
            </p>

            <div className={styles.grid}>
                {SPECS.map((spec, i) => (
                    <motion.div
                        key={spec.label}
                        className={styles.specCard}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08, duration: 0.5 }}
                    >
                        <span className={styles.specLabel}>{spec.label}</span>
                        <span className={styles.specValue}>{spec.value}</span>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}