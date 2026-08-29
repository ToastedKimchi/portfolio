'use client'
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MessageCircleMore, MapPin, CheckCircle2 } from 'lucide-react';
import styles from './contact.module.css';
import Github from '@/public/icons/github.svg';
import Linkedin from '@/public/icons/linkedin.svg';
import { Variant, Variants } from 'motion';

const CONTACT_INFO = [
    { icon: Mail, label: 'Email', value: 'jinukasw@gmail.com', href: 'mailto:jinukasw@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+94 71 875 2440', href: 'tel:+94718752440' }, 
    { icon: MessageCircleMore, label: 'Instagram', value: '@jinuka_sw', href: 'https://instagram.com/jinuka_sw' },
    { icon: MapPin, label: 'Based in', value: 'Colombo, Sri Lanka', href: 'https://share.google/N19NUk8erOOp1XBog' },
];

const containerVariants : Variants   = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants : Variants = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [focused, setFocused] = useState<string | null>(null);
    const [sent, setSent] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSent(true);
    };

    return (
        <section id="contact" className={styles.contact}>
            <div className={styles.grid}>
                <motion.div
                    className={styles.infoCol}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                >
                    <motion.span className="eyebrow" variants={itemVariants}>GET IN TOUCH</motion.span>
                    <motion.h2 className={styles.title} variants={itemVariants}>Let&apos;s build something.</motion.h2>
                    <motion.p className={styles.desc} variants={itemVariants}>
                        Have a project, an idea, or just want to talk embedded systems
                        and 3D pipelines? Reach me however&apos;s easiest.
                    </motion.p>

                    <div className={styles.infoList}>
                        {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => {
                            const row = (
                                <>
                                    <span className={styles.infoIcon}><Icon size={16} /></span>
                                    <span className={styles.infoText}>
                                        <span className={styles.infoLabel}>{label}</span>
                                        <span className={styles.infoValue}>{value}</span>
                                    </span>
                                </>
                            );
                            return (
                                <motion.div key={label} variants={itemVariants}>
                                    {href ? (
                                        <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className={styles.infoRow}>
                                            {row}
                                        </a>
                                    ) : (
                                        <div className={styles.infoRow}>{row}</div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>

                    <motion.div className={styles.links} variants={itemVariants}>
                        <a href="https://github.com/ToastedKimchi" target="_blank" rel="noreferrer"><Github /></a>
                        <a href="https://www.linkedin.com/in/jinuka-waduge-99415735b/" target="_blank" rel="noreferrer"><Linkedin /></a>
                    </motion.div>
                </motion.div>

                <motion.form
                    className={styles.form}
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                    <AnimatePresence mode="wait">
                        {sent ? (
                            <motion.div
                                key="sent"
                                className={styles.sentState}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <motion.span
                                    initial={{ scale: 0, rotate: -90 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ delay: 0.15, type: 'spring', stiffness: 300, damping: 18 }}
                                >
                                    <CheckCircle2 size={40} color="var(--accent)" strokeWidth={1.5} />
                                </motion.span>
                                <p>Message received — I&apos;ll get back to you soon.</p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="form-fields"
                                initial={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className={styles.fieldsWrap}
                            >
                                {(['name', 'email', 'message'] as const).map((fieldName) => (
                                    <div className={styles.field} key={fieldName}>
                                        <div className={styles.fieldLabelRow}>
                                            <span>{fieldName}</span>
                                            {fieldName === 'message' && (
                                                <span className={styles.charCount}>{form.message.length}/500</span>
                                            )}
                                        </div>

                                        {fieldName === 'message' ? (
                                            <textarea
                                                name="message"
                                                value={form.message}
                                                onChange={handleChange}
                                                onFocus={() => setFocused('message')}
                                                onBlur={() => setFocused(null)}
                                                required
                                                rows={5}
                                                maxLength={500}
                                                placeholder="What are you working on?"
                                            />
                                        ) : (
                                            <input
                                                type={fieldName === 'email' ? 'email' : 'text'}
                                                name={fieldName}
                                                value={form[fieldName]}
                                                onChange={handleChange}
                                                onFocus={() => setFocused(fieldName)}
                                                onBlur={() => setFocused(null)}
                                                required
                                                placeholder={fieldName === 'email' ? 'you@email.com' : 'Your name'}
                                            />
                                        )}

                                    </div>
                                ))}

                                <motion.button
                                    type="submit"
                                    className={styles.submitBtn}
                                    whileHover={{ scale: 1.015 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Send Message
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.form>
            </div>

            <div className={styles.footerBar}>
                <span>© 2026 — Jinuka</span>
                <span>Colombo, Sri Lanka</span>
            </div>
        </section>
    );
}