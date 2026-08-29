'use client'
import { Suspense } from 'react';
import { motion } from 'motion/react';
import { SquareArrowOutUpRight, Box } from 'lucide-react';
import dynamic from 'next/dynamic';
import styles from './projects.module.css';

const ProjectPreview = dynamic(() => import('@/components/ui/projectPreview'), { ssr: false });

const PROJECTS = [
    {
        name: 'Bizzles',
        tag: 'Full-Stack',
        desc: 'A forum-style, problem-solution platform - connecting businesses with professionals that can help.',
        stack: ['Next.js', 'Supabase', 'TypeScript'],
        model: '/3Dmodels/Message Board.glb',
        scale: 0.012
    },
    {
        name: '3-DOF Stabilization Platform',
        tag: 'Embedded / Control',
        desc: 'A parallel-actuated stabilization rig - three linear actuators in an equilateral arrangement, driven by inverse kinematics and PID + feedforward control + Web socket based operator panel for production grade operation.',
        stack: ['ESP32', 'PyBullet', 'PID Control'],
        model: '/3Dmodels/Platform.glb', 
        scale: 0.5
    },
    {
        name: 'Custom RC Car',
        tag: 'Mechanical / Fabrication',
        desc: 'A custom built RC vehicle capable of simulating destruction mechanics, without incurring harm to components - Controllable via external fleet management software.',
        stack: ['3D Printing', 'Snap-Fit Design', 'RC Systems'],
        model: '/3Dmodels/Buggy.glb', 
        scale: 0.5
    },
    {
        name: 'Project Wander',
        tag: 'Game Dev',
        desc: '2D-AI integrated souls-like game with crafting mechanics, custom assets and advanced player predicting NPCs.',
        stack: ['C++', 'Godot', 'ASprite'],
        model: '/3Dmodels/Knight.glb',
        scale: 0.1
    },
    {
        name: 'Real-Time AI Avatar',
        tag: 'ML / Systems',
        desc: 'Realistic-human like coaching agent that can detect various physical characteristics and generate appropriate responses.',
        stack: ['Unreal Engine', 'MediaPipe', 'WebSockets'],
        model: '/3Dmodels/Brain.glb',
        scale: 0.15
    },
];

export default function Projects() {
    return (
        <section id="projects" className={styles.projects}>
            <span className="eyebrow">FIELD LOG</span>
            <h2 className={styles.title}>Projects that I&apos;m working on.</h2>

            <div className={styles.list}>
                {PROJECTS.map((p, i) => (
                    <motion.div
                        key={p.name}
                        className={styles.card}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ delay: i * 0.06, duration: 0.5 }}
                        whileHover={{ y: -6 }}
                    >
                        <div className={styles.stage}>
                            {p.model ? (
                                <Suspense fallback={<div className={styles.stageLoading} />}>
                                    <ProjectPreview modelPath={p.model} scale={p.scale} />
                                </Suspense>
                            ) : (
                                <div className={styles.stagePlaceholder}>
                                    <Box size={22} strokeWidth={1.4} />
                                    <span>3D PREVIEW</span>
                                </div>
                            )}
                        </div>

                        <div className={styles.cardBody}>
                            <div className={styles.cardHead}>
                                <span className={styles.cardTag}>{p.tag}</span>
                                <SquareArrowOutUpRight size={16} color="var(--fg-muted)" />
                            </div>
                            <h3 className={styles.cardName}>{p.name}</h3>
                            <p className={styles.cardDesc}>{p.desc}</p>
                            <div className={styles.cardStack}>
                                {p.stack.map((s) => <span key={s}>{s}</span>)}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}