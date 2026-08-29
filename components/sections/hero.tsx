'use client'
import { motion } from 'motion/react';
import dynamic from 'next/dynamic';
import styles from './hero.module.css';

const Text3D = dynamic(() => import('@/components/ui/text3D'), { ssr: false });

const CODE_LINES = [
    { n: '01', text: "const jinuka = {" },
    { n: '02', text: "  role: 'CS Undergrad @ KDU',", indent: true },
    { n: '03', text: "  focus: ['Full-Stack', 'AI/ML', 'Game Dev'],", indent: true },
    { n: '04', text: "  builds: 'Control Systems, 3D scenes,", indent: true },
    { n: '05', text: "           full-stack products',", indent: true },
    { n: '06', text: "  status: 'Compiling ideas into implementation'", indent: true },
    { n: '07', text: "}" },
];

export default function Hero() {
    return (
        <section id="work" className={styles.hero}>
            <div className={styles.grid}>
                <motion.div
                    className={styles.codePanel}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className={styles.panelHead}>
                        <div className={styles.dots}>
                            <span /><span /><span />
                        </div>
                        <span className={styles.fileName}>about-me.ts</span>
                    </div>
                    <div className={styles.codeBody}>
                        {CODE_LINES.map((line) => (
                            <div key={line.n} className={styles.codeLine}>
                                <span className={styles.lineNum}>{line.n}</span>
                                <span className={styles.lineText}>{line.text}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <div className={styles.copyCol}>
                    <span className="eyebrow">PORTFOLIO — J.</span>
                    <h1 className={styles.headline}>
                        I build the <span>logic</span>
                        <span className={styles.accentWord}> and </span>
                        the <span className={styles.accentWord}>world</span> it runs in.
                    </h1>
                    <p className={styles.subtext}>
                        Computer Science undergrad specializing in full-stack and
                        AI/ML/Game development : capable of breaking down complex
                        systems and transforming them to fit the bill.
                    </p>

                    <div className={styles.specRow}>
                        <span className={styles.specPill}>Embedded Systems</span>
                        <span className={styles.specPill}>3D / Game Dev</span>
                        <span className={styles.specPill}>Full-Stack</span>
                        <span className={styles.specPill}>ML Engineering</span>
                    </div>
                </div>
            </div>

            <div className={styles.stageRow}>
                <div className={styles.stage}>
                    <Text3D />
                </div>
                <div className={styles.stageCaption}>
                    <span className={styles.captionNum}>/</span>
                    <span className={styles.captionNum}>/</span>
                    Rendered live in your browser via Three.js
                    <span className={styles.captionNum}>/</span>
                    <span className={styles.captionNum}>/</span>
                </div>
            </div>
        </section>
    );
}