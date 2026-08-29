'use client'
import { useState } from 'react';
import { motion } from 'motion/react';
import styles from './floatingNav.module.css';

const TABS = [
    { id: 'work', label: 'Work' },
    { id: 'systems', label: 'Systems' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
];

export default function FloatingNav() {
    const [active, setActive] = useState('work');

    const scrollTo = (id: string) => {
        setActive(id);
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <motion.div
            className={styles.pillNav}
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
        >
            <div className={styles.avatar}>J.</div>

            {TABS.map((tab) => (
                <button
                    key={tab.id}
                    className={`${styles.tab} ${active === tab.id ? styles.tabActive : ''}`}
                    onClick={() => scrollTo(tab.id)}
                >
                    {tab.label}
                </button>
            ))}

            <a href="/resume.pdf" target="_blank" rel="noreferrer" className={styles.resumeBtn}>
                Resume
            </a>
        </motion.div>
    );
}