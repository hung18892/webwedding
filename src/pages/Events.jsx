import EventCards from '@/components/EventsCard';
import config from '@/config/config';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useRef } from 'react';

export default function Events() {
    const { agenda } = config.data;
    const sectionRef = useRef(null);
    
    // Scroll controls
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Image2: Left to center with fade
    const image2X = useTransform(scrollYProgress, [0, 1], ["-30%", "50%"]);
    const image2Opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.6]);
    
    // Image3: Right to center with fade
    const image3X = useTransform(scrollYProgress, [0, 1], ["130%", "50%"]);
    const image3Opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.6]);

    return (
        <section 
            id="event" 
            ref={sectionRef}
            className="relative min-h-screen overflow-hidden bg-white"
        >
            {/* ========== PARALLAX BACKGROUNDS ========== */}
            {/* Image 2 - Left to center */}
            <motion.div
                style={{
                    x: image2X,
                    opacity: image2Opacity,
                    backgroundImage: "url('/images/image2.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
                className="absolute inset-0 z-0"
            />
            
            {/* Image 3 - Right to center */}
            <motion.div
                style={{
                    x: image3X,
                    opacity: image3Opacity,
                    backgroundImage: "url('/images/image3.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
                className="absolute inset-0 z-0"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/10 z-1" />

            {/* ========== MAIN CONTENT ========== */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="relative z-10 container mx-auto px-4 py-16 sm:py-20"
            >
                {/* Header content... */}
                
                {/* Events grid... */}
            </motion.div>
        </section>
    );
}
