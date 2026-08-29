'use client'
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import styles from './navbar.module.css';

const TABS = [
    { id: 'work', label: 'About' },
    { id: 'about', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
];

export default function FloatingNav() {
    const [active, setActive] = useState('work');
    const [hidden, setHidden] = useState(false);
    const lastY = useRef(0);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, 'change', (y) => {
        const delta = y - lastY.current;
        if (y < 120) setHidden(false);
        else if (delta > 4) setHidden(true);
        else if (delta < -4) setHidden(false);
        lastY.current = y;
    });

    useEffect(() => {
        const sections = TABS.map((t) => document.getElementById(t.id)).filter(Boolean) as HTMLElement[];
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActive(entry.target.id);
                });
            },
            { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
        );
        sections.forEach((s) => observer.observe(s));
        return () => observer.disconnect();
    }, []);

    const scrollTo = (id: string) => {
        setActive(id);
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className={styles.navWrapper}>
            <motion.div
                className={styles.pillNav}
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: hidden ? 100 : 0, opacity: hidden ? 0 : 1 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
            >
                <div className={styles.avatar}>
                    J.
                </div>

                <div className={styles.tabs}>
                    {TABS.map((tab) => (
                        <button
                            key={tab.id}
                            className={styles.tab}
                            onClick={() => scrollTo(tab.id)}
                            data-active={active === tab.id}
                        >
                            {active === tab.id && (
                                <motion.span
                                    layoutId="navIndicator"
                                    className={styles.indicator}
                                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                                />
                            )}
                            <span className={styles.tabLabel}>{tab.label}</span>
                        </button>
                    ))}
                </div>

                <a href="/JSWaduge - CV.pdf" target="_blank" rel="noreferrer" className={styles.resumeBtn}>
                    Resume
                </a>
            </motion.div>
        </div>
    );
}