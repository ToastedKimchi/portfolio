'use client'
import { motion } from 'motion/react';
import styles from './qualifications.module.css';

const ENTRIES = [
    {
        num: '01',
        period: '2026 — Present',
        role: 'BSc Computer Science',
        org: 'General Sir John Kotelawala Defence University',
        note: 'Specializing In Embedded Systems & Full Stack Applications',
    },
    {
        num: '02',
        period: '2011-2024',
        role: 'Student At Royal College',
        org: 'Royal College Colombo',
        note: 'Building Solid Educational Foundations.',
    },
    {
        num: '03',
        period: '2025',
        role: 'ESOFT DIIT Student',
        org: 'ESOFT',
        note: 'Introductory Content Coverage Related To IT Concepts',
    },
];

export default function Qualifications() {
    return (
        <section id="about" className={styles.wrap}>
            <span className="eyebrow">CREDENTIALS</span>
            <h2 className={styles.title}>How I got here.</h2>

            <div className={styles.cards}>
                {ENTRIES.map((entry, i) => (
                    <motion.div
                        key={entry.num}
                        className={styles.card}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                    >
                        <div className={styles.cardBar} />
                        <div className={styles.cardBody}>
                            <div className={styles.cardTop}>
                                <span className={styles.num}>{entry.num}</span>
                                <span className={styles.period}>{entry.period}</span>
                            </div>
                            <h3 className={styles.role}>{entry.role}</h3>
                            <span className={styles.org}>{entry.org}</span>
                            <p className={styles.note}>{entry.note}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}