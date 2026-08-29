'use client'

import Contact from '../../components/sections/contact';
import Hero from '../../components/sections/hero';
import Education from '../../components/sections/qualifications';
import Skills from '../../components/sections/skills';
import Projects from '../../components/sections/projects';
import Experience from '../../components/sections/experience';
import FloatingNav from '../../components/ui/navbar';

export default function Dashboard() {

    return (
        <div>
            <Hero/>
            <Education/>
            <Skills/>
            <Projects/>
            <Experience/>
            <Contact/>

            <FloatingNav/>
        </div>
    )
}