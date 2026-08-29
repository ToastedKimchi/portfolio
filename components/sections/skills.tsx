'use client'
import { motion } from 'motion/react';
import styles from './skills.module.css';

const GROUPS = [
    {
        channel: 'CH.01',
        name: 'Embedded & Control',
        signal: 60,
        items: ['ESP32 / Arduino', 'PID & Feedforward', 'Inverse Kinematics', 'Sensor Fusion (IMU)'],
    },
    {
        channel: 'CH.02',
        name: 'Software & Web',
        signal: 70,
        items: ['TypeScript / React', 'Next.js', 'Supabase', 'Three.js'],
    },
    {
        channel: 'CH.03',
        name: 'AI/ML',
        signal: 45,
        items: ['Python', 'Numpy', 'Pandas', 'AI Integration'],
    },
    {
        channel: 'CH.04',
        name: 'Game & 3D',
        signal: 65,
        items: ['C++/C#', 'Unreal Engine', 'Godot', 'Blender', 'PyGame'],
    },
    {
        channel: 'CH.05',
        name: 'Media Manipulation',
        signal: 50,
        items: ['Premiere Pro', 'Adobe AE', 'Photoshop'],
    },
];

function SignalBars({ strength }: { strength: number }) {
    const bars = 5;
    const active = Math.round((strength / 100) * bars);

    return (
        <div className={styles.signalBars}>
            {Array.from({ length: bars }).map((_, i) => (
                <motion.span
                    key={i}
                    className={styles.bar}
                    style={{ height: `${8 + i * 4}px` }}
                    initial={{ opacity: 0.15 }}
                    whileInView={{ opacity: i < active ? 1 : 0.15 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.06 }}
                    data-active={i < active}
                />
            ))}
        </div>
    );
}

export default function Skills() {
    return (
        <section id="skills" className={styles.skills}>
            <div className={styles.headRow}>
                <div>
                    <span className="eyebrow">SIGNAL CHANNELS</span>
                    <h2 className={styles.title}>What I can build with.</h2>
                </div>
                <span className={styles.scanLabel}>SCANNING://</span>
            </div>

            <div className={styles.grid}>
                {GROUPS.map((group, gi) => (
                    <motion.div
                        key={group.channel}
                        className={styles.card}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ delay: gi * 0.1, duration: 0.5, ease: 'easeOut' }}
                        whileHover={{ y: -6 }}
                    >
                        <span className={styles.ghostNum}>{group.channel.replace('CH.', '')}</span>

                        <div className={styles.cardHead}>
                            <span className={styles.channelId}>{group.channel}</span>
                            <SignalBars strength={group.signal} />
                        </div>

                        <h3 className={styles.channelName}>{group.name}</h3>

                        <motion.div
                            className={styles.underline}
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: gi * 0.1 + 0.2, duration: 0.5 }}
                        />

                        <div className={styles.items}>
                            {group.items.map((item, ii) => (
                                <motion.span
                                    key={item}
                                    className={styles.item}
                                    initial={{ opacity: 0, x: -8 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: gi * 0.1 + 0.3 + ii * 0.05, duration: 0.35 }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    {item}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}