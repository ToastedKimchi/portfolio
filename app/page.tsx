'use client'

import styles from "./homestyles.module.css"
import { motion } from 'motion/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import StrokeHeadline from "../src/components/StrokeHeadline";
import { CodeXml } from 'lucide-react';
import { Cpu } from 'lucide-react';
import { BrainCog } from 'lucide-react';
import EnhancedWindowCard from '../components/ui/windowcard';
import CustomActionButton from '../components/ui/custombutton';
import { CornerDownLeft } from 'lucide-react';

const MotionCodeXml = motion(CodeXml);
const MotionCpu = motion(Cpu);
const MotionBrainCog = motion(BrainCog);

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {

      if (event.key === "Enter") {
        router.push('./dashboard')
      }

      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault(); // Prevents default browser shortcut
        console.log("Command/Control + K shortcut triggered!");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <div className={styles.mainDiv}>
      <div className={styles.phraseDiv}>
        <StrokeHeadline />
      </div>

      <motion.div className={styles.midSection}>

        <EnhancedWindowCard motionIcon={MotionCodeXml} text="BUILDING"/>

        <EnhancedWindowCard motionIcon={MotionCpu} text="INNOVATING"/>

        <EnhancedWindowCard motionIcon={MotionBrainCog} text="LEARNING"/>

      </motion.div>

      <motion.div className={styles.interactiveSection}>
          <CustomActionButton text="VIEW PORTFOLIO" icon={CornerDownLeft} onClick={() => router.push('./dashboard')}/>
      </motion.div>
    </div>
  );
}
