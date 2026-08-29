'use client'
import { motion } from 'motion/react';
import styles from './experience.module.css';

const EXPERIENCE: {
    role: string;
    org: string;
    period: string;
    note: string;
}[] = [];

function PendingState() {
    return (
        <div className={styles.pendingPanel}>
            <div className={styles.radar}>
                <motion.div
                    className={styles.sweep}
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
                />
                <div className={styles.radarRing} />
                <div className={styles.radarRing} style={{ width: '60%', height: '60%' }} />
                <div className={styles.radarRing} style={{ width: '30%', height: '30%' }} />
                <div className={styles.radarCenter} />
            </div>

            <div className={styles.pendingText}>
                <div className={styles.pendingHead}>
                    <motion.span
                        className={styles.pulseDot}
                        animate={{ opacity: [1, 0.2, 1] }}
                        transition={{ repeat: Infinity, duration: 1.6 }}
                    />
                    <span className={styles.pendingLabel}>AWAITING FIRST ENTRY</span>
                </div>
                <p className={styles.pendingDesc}>
                    No work experience as of yet — this section is live and will
                    be updated the moment there&apos;s something to report. Actively looking
                    for internships and practical roles in embedded systems, ML, or
                    full-stack work.
                </p>
                <a href="#contact" className={styles.pendingCta}>Know of something? Reach out →</a>
            </div>
        </div>
    );
}

function LogEntry({ entry, index, isLast }: { entry: (typeof EXPERIENCE)[number]; index: number; isLast: boolean }) {
    return (
        <motion.div
            className={styles.logRow}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
        >
            <div className={styles.logRail}>
                <span className={styles.logBlip} />
                {!isLast && <span className={styles.logLine} />}
            </div>
            <div className={styles.logBody}>
                <div className={styles.logTop}>
                    <span className={styles.logRole}>{entry.role}</span>
                    <span className={styles.logPeriod}>{entry.period}</span>
                </div>
                <span className={styles.logOrg}>{entry.org}</span>
                <p className={styles.logNote}>{entry.note}</p>
            </div>
        </motion.div>
    );
}

export default function Experience() {
    const hasEntries = EXPERIENCE.length > 0;

    return (
        <section id="experience" className={styles.experience}>
            <div className={styles.headRow}>
                <div>
                    <span className="eyebrow">PRACTICAL LOG</span>
                    <h2 className={styles.title}>Work & practical experience.</h2>
                </div>
                <span className={styles.statusTag} data-active={hasEntries}>
                    {hasEntries ? `${EXPERIENCE.length} LOGGED` : 'STANDBY'}
                </span>
            </div>

            {hasEntries ? (
                <div className={styles.log}>
                    {EXPERIENCE.map((entry, i) => (
                        <LogEntry key={entry.role + entry.org} entry={entry} index={i} isLast={i === EXPERIENCE.length - 1} />
                    ))}
                </div>
            ) : (
                <PendingState />
            )}
        </section>
    );
}